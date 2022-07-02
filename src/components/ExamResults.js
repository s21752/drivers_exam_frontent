import styles from '../ui/styles/ExamResults.module.css'
import {SimplifiedQuestion} from "../data/model/SimplifiedQuestion";
import SimplifiedQuestionRepresentation from "./SimplifiedQuestionRepresentation";

export default function ExamResults(props) {

    let state = props.state
    let dispatch = props.dispatcher

    let pointsArray = state?.answers?.map((answer, index) => {
        return answer === state.questions[index].correctAnswer ? 1 : 0
    })

    const initialValue = 0;
    const sum = pointsArray?.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initialValue
    );

    let simplifiedQuestions = state?.questions?.map((question, index) =>
        new SimplifiedQuestion(index, question?.content, question?.correctAnswer, state?.answers[index])
    )

    const restartExam = () => {
        dispatch({ type:"RESTART"})
    }

    return (
        <div>
            <h1 className={styles.scoreTitle}>Wynik egzaminu</h1>
            <div className={styles.scoreContainer}>
                <h2>Uzyskany przez Ciebie wynik to:</h2>
                <br/>
                <h1>{sum}/{Math.min(state?.questions?.length, state?.questions?.length)} PKT</h1>
            </div>

            <div className={styles?.resultDetailsContainer}>
                {simplifiedQuestions?.map((question) => {
                    return <SimplifiedQuestionRepresentation data={question}/>
                })}
            </div>
            <div className={styles.centerDiv}>
                <button onClick={restartExam} className={styles.restartButton}>Zrestartuj egzamin</button>
            </div>
        </div>
    )
}