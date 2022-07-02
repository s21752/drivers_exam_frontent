import styles from '../ui/styles/SimplifiedQuestionRepresentation.module.css'

export default function SimplifiedQuestionRepresentation(props) {
    let simplifiedQuestion = props.data

    return (
        <div className={`${simplifiedQuestion.userAnswer === simplifiedQuestion.correctAnswer ? styles.correct : styles.incorrect} ${styles.mainDive}`}>
            <div className={styles.question}>Pytanie {simplifiedQuestion.index + 1}.) {simplifiedQuestion.content}</div>
            <div className={styles.answers}>
                <div>Poprawna: {simplifiedQuestion.correctAnswer}</div>
                <div>Udzielona: {simplifiedQuestion.userAnswer}</div>
            </div>
        </div>
            )
}