import styles from '../ui/styles/ExamPrompt.module.css'

export default function ExamPrompt(props) {
    let dispatch = props.dispatcher

    const startExam = () => {
        dispatch( { type : "RESTART"} )
    }

    return <div className={styles.mainDiv}>
        <h1>Czy jesteś gotowy na egzamin?</h1>
        <br/><br/><br/>
        <button onClick={startExam}>Tak, zaczynajmy!</button>
    </div>
}