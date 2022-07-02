import styles from "../ui/styles/QuestionAddEditionScreen.module.css";

export default function ExamQuestion(props) {

    let state = props.state
    let mainDispatch = props.dispatcher

    console.log(`state is ${JSON.stringify(state)}`)
    let question = state?.questions[state.currentIndex]

    let image = question?.imageUrl

    const handleAnswer = (event) => {
        let currentAnswer = state.answers[state.currentIndex]
        if (currentAnswer !== null && currentAnswer !== "" && currentAnswer !== undefined) {
            event.preventDefault()

            mainDispatch({type: "HANDLE_ANSWER"})
        }
    }

    let leftQuestions = Math.min(state.questions.length, state.questions.length) - state.currentIndex


    return <div className={styles.mainDiv}>
        <h1 className={styles.question}>{question?.content}</h1>
        <form>
            {image !== null && image !== "" && image !== "null" ? <img className={styles.image} src={image}/> :
                <div/>}


            {question?.allAnswers.map((answer, index) => {
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
                                   checked={answerValue === state.answers[state.currentIndex]}
                                   required
                            /></label><br/>
                    </div>
                )
            })}

            <button className={styles.saveAnswerButton}
                    onClick={handleAnswer}>{leftQuestions === 1 ? "Zakończ egzamin" : "Zapisz odpowiedź"}</button>
        </form>
    </div>
}