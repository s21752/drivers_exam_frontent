import {useEffect, useReducer} from "react";
import {Question} from "../data/model/Question";
import PracticeQuestion from "./PracticeQuestion";
import PracticePrompt from "./PracticePrompt";
import PracticeResults from "./PracticeResults";
import styles from '../ui/styles/PracticeScreenContent.module.css'

const reducer = (state, action) => {
    switch (action.type) {
        case "START":
            return {
                ...state,
                question: null,
                currentState: "FETCH_QUESTION"
            }
        case "SAVE_ANSWER":
            return {
                ...state,
                answer : action.answer
            }
        case "SHOW_QUESTION":
            return {
                ...state,
                question: action.question,
                answer: null,
                currentState: "QUESTION_SHOWING"
            }
        case "RESULTS":
            return {
                ...state,
                currentState: "SHOW_RESULTS"
            }
        case "STOP":
            return {
                ...state,
                question: null,
                currentState: "STOPPED"
            }
    }
}

const getRandomQuestionUrl = 'https://localhost:7221/api/Questions/GetRandom'

export default function PracticeScreenContent() {
    const [state, dispatch] = useReducer(reducer, {
        currentState: "STOPPED"
    })

    useEffect(() => {
        const fetchData = () => {
            fetch(getRandomQuestionUrl)
                .then((response) => {
                    if (response.ok) return response.json()
                    throw Error("Problem fetching random question from back end")
                })
                .then((randomQuestion) => {
                    dispatch({
                        type: "SHOW_QUESTION",
                        question: new Question(randomQuestion.content, randomQuestion.allAnswers, randomQuestion.correctAnswer, randomQuestion.imageUrl, randomQuestion.questionId)
                    })
                })
        }

        if (state?.currentState === "FETCH_QUESTION")
            fetchData()

    }, [state?.currentState])

    const stop = () => {
        dispatch({ type : "STOP"})
    }

    return <div className={styles.mainDiv}>
        {state?.currentState !== "STOPPED" ? <button onClick={stop} className={styles.stopButton}>Przerwij ćwiczenia</button> : <div/> }

        {state?.currentState === "QUESTION_SHOWING" ?
            <PracticeQuestion dispatcher={dispatch} state={state}/> : state?.currentState === "STOPPED" ?
                <PracticePrompt dispatcher={dispatch} state={state}/> : state?.currentState === "SHOW_RESULTS" ?
                    <PracticeResults dispatcher={dispatch} state={state}/> : <div/>
        }
    </div>
}
