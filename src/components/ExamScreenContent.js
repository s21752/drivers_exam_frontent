import {useEffect, useReducer, useState} from "react";
import {Question} from "../data/model/Question";
import ExamPrompt from "./ExamPrompt";
import ProperExamContent from "./ProperExamContent";
import ExamResults from "./ExamResults";
import styles from '../ui/styles/ExamScreenContent.module.css'

const questionsQuantity = 15
const fetchRandomQuestionsUrl = 'https://localhost:7221/api/Questions/GetSomeRandom?quantity='

const reducer = (state, action) => {
    switch (action.type) {
        case "START_EXAM":
            return {
                points: 0,
                currentIndex: 0,
                currentAction: "EXAM",
                questions: action.questions,
                answers: [],
                shouldFetchNewQuestion: false
            }
        case "RESTART":
            return {
                shouldFetchNewQuestion: true
            }
        case "FINISH_EXAM":
            return {
                ...state,
                currentAction: "RESULTS"
            }
        case "SAVE_ANSWER":
            var updatedAnswers = state.answers
            updatedAnswers[state.currentIndex] = action.answer
            return {
                ...state,
                answers: updatedAnswers
            }
        case "HANDLE_ANSWER":
            let isCorrect = state.answers[state.currentIndex] === state.questions[state.currentIndex].correctAnswer

            console.log(`correct answer: ${isCorrect}`)
            if (isCorrect)
                return {
                    ...state,
                    points: state.points + 1,
                    currentIndex: state.currentIndex + 1,
                }
            else {
                return {
                    ...state,
                    currentIndex: state.currentIndex + 1,
                }
            }
    }
}

export default function ExamScreenContent() {

    const currentFetchQuestionsUrl = fetchRandomQuestionsUrl + questionsQuantity

    const [examState, dispatch] = useReducer(reducer, {
        points: 0,
        currentIndex: 0,
        currentAction: "EMPTY",
        questions: [],
        answers: [],
        shouldFetchNewQuestion: false
    })

    useEffect(() => {
        const fetchNewQuestions = () => {
            fetch(currentFetchQuestionsUrl)
                .then((response) => {
                    if (response.ok) return response.json()
                    throw Error('Somethings wrong while fetching new exam questions')
                })
                .then((questions) => {
                    dispatch({
                        type: "START_EXAM",
                        questions: questions.map((question) => new Question(question.content, question.allAnswers, question.correctAnswer, question.imageUrl, question.questionId))
                    })
                })
        }

        if (examState.shouldFetchNewQuestion) {
            fetchNewQuestions()
        }
    }, [examState.shouldFetchNewQuestion])


    return (
        <div className={styles.mainDiv}>
            {examState.currentAction === "EMPTY" ?
                <ExamPrompt dispatcher={dispatch}/> : examState.currentAction === "EXAM" ?
                    <ProperExamContent dispatcher={dispatch} state={examState}/> :
                    <ExamResults dispatcher={dispatch} state={examState}/>}
        </div>

    )
}