import styles from "../ui/styles/ExamPrompt.module.css";

export default function PracticePrompt(props) {

    let dispatch = props.dispatcher

    const startPractice = () => {
        dispatch( { type : "START"} )
    }

    return <div className={styles.mainDiv}>
        <h1>Czy jesteś gotowy na trening?</h1>
        <br/><br/><br/>
        <button onClick={startPractice}>Tak, zaczynajmy!</button>
    </div>}