import ExamQuestion from "./ExamQuestion";
import styles from '../ui/styles/ProperExamContent.module.css'

export default function ProperExamContent(props) {
    let examState = props.state
    let dispatch = props.dispatcher

    let leftQuestions = Math.min(examState.questions.length, examState.questions.length) - examState.currentIndex

    if (leftQuestions === 0) {
        dispatch({ type : "FINISH_EXAM"})
    }

    return (
        <div className={styles.mainDiv}>
            <div className={styles.topDiv}>
                <div
                    className={styles.questionNumber}>{examState.currentIndex + 1} / {Math.min(examState.questions.length, examState.questions.length)}</div>
                <div className={styles.filler}/>
                <div className={styles.questionsInfo}>pozostało {leftQuestions}</div>
            </div>
            <h2>Pytanie nr {examState.currentIndex + 1}</h2>
            <br/>
            <ExamQuestion className={styles.examQuestion} dispatcher={dispatch} state={examState}/>
            <button className={styles.restartButton} onClick={() => {
                dispatch({type: "RESTART"})
            }
            }>Zrestartuj egzamin
            </button>
        </div>
    )
}