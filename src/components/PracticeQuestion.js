import styles from "../ui/styles/QuestionAddEditionScreen.module.css";

export default function PracticeQuestion(props) {

    let state = props.state
    let mainDispatch = props.dispatcher

    let currentQuestion = state?.question

    let image = currentQuestion?.imageUrl

    const handleAnswer = (event) => {
        let currentAnswer = state.answer
        if (currentAnswer !== null && currentAnswer !== "" && currentAnswer !== undefined) {
            event.preventDefault()

            mainDispatch({type: "RESULTS", question: currentQuestion})
        }
    }


    return <div className={styles.mainDiv}>
        <h1 className={styles.question}>{currentQuestion?.content}</h1>
        <form>
            {image !== null && image !== "" && image !== "null" ? <img className={styles.image} src={image}/> :
                <div/>}


            {currentQuestion?.allAnswers.map((answer, index) => {
                const name = `answer${index}`
                const answerValue = answer

                return (
                    <div className={styles.answerLabel} key={index}>
                        <label>{answerValue}
                            <input onChange={(event) => {
                                mainDispatch({type: "SAVE_ANSWER", answer: event.target.value})
                            }}
                                   type="radio"
                                   name="userAnswer"
                                   value={answerValue}
                                   checked={answerValue === state.answer}
                                   required
                            /></label><br/>
                    </div>
                )
            })}

            <button className={styles.saveAnswerButton}
                    onClick={handleAnswer}>Sprawdź odpowiedź</button>
        </form>
    </div>
}