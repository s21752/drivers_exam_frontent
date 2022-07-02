import {useEffect, useState} from "react";
import styles from '../ui/styles/QuestionAddEditionScreen.module.css'
import {useNavigate} from "react-router";

const createNewQuestionUrl = 'https://localhost:7221/api/Questions/Create'

export default function AddNewQuestion() {
    const [inputs, setInputs] = useState({})
    const [goBack, setGoBack] = useState(false)
    const [answersQuantity, setAnswersQuantity] = useState(2)
    const [checkIndex, setCheckIndex] = useState(-1)

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    let navigate = useNavigate()

    useEffect(() => {
        const goToList = () => {
            setGoBack(false)
            navigate("/edit")
        }

        if (goBack) {
            goToList()
        }
    }, [goBack])

    const handleSubmit = (event) => {
        const imageUrl = inputs.imageUrl || null
        const content = inputs.questionContent || null
        let addedAnswers = []
        for (let i = 0; i < answersQuantity; i++) {
            let name = `answer${i}`
            let answer = inputs[name]
            if (answer !== null && answer && answer !== "") {
                addedAnswers.push(answer)
            }
        }

        const correctAnswer = addedAnswers[checkIndex]

        if (correctAnswer === undefined || content === null || content === "" || correctAnswer === null || correctAnswer === "" || addedAnswers.length < 2) {
            // nothing
            return false
        } else {
            event.preventDefault()
        }

        let updateObject = {
            Content: content,
            CorrectAnswer: correctAnswer,
            ImageUrl: imageUrl,
            Answers: addedAnswers
        }

        let data = new FormData()
        if (updateObject.Content !== null)
            data.append("Content", updateObject.Content)

        if (updateObject.CorrectAnswer !== null)
            data.append("CorrectAnswer", updateObject.CorrectAnswer)

        if (updateObject.ImageUrl !== null)
            data.append("ImageUrl", updateObject.ImageUrl)

        updateObject.Answers?.forEach((string) => {
            if (string !== "" && string !== "null")
                data.append("AllAnswers", string)
        })

        fetch(createNewQuestionUrl, {
            method: "POST",
            body: data
        }).then((response) => {
            if (response.ok) return
            throw new Error(`something went wrong while adding new question`)
        }).then(() => {
            setGoBack(true)
        })
    }

    const handleAddAnswer = (event) => {
        setAnswersQuantity((quantity) => quantity + 1)
    }

    const handleRemoveLastAnswer = (event) => {
        setAnswersQuantity((quantity) => quantity - 1)
    }

    let image = inputs.imageUrl

    return (
        <div className={styles.content}>
            <form onSubmit={handleSubmit}>
                <label><h3>Treść pytania:</h3>
                    <textarea
                        name="questionContent"
                        placeholder="Treść pytania"
                        value={inputs.questionContent || ""}
                        onChange={handleChange}
                        required
                    />
                </label><br/><br/><br/>
                <label><h3>Adres url do obrazka:</h3>
                    <input
                        className={styles.imageUrlText}
                        type="text"
                        name="imageUrl"
                        placeholder="opcjonalny adres do zdjęcia"
                        value={inputs.imageUrl || ""}
                        onChange={handleChange}
                    />
                </label><br/>
                {image !== undefined && image !== null && image !== "" && image !== "null" ? <img className={styles.image} src={image}/> :
                    <div className={styles.noHeight}/>}<br/><br/>
                <h3>Wszystkie odpowiedzi:</h3>
                {new Array(answersQuantity).fill().map((_, index) => {
                    const name = `answer${index}`
                    const answerValue = inputs[name] || ""

                    return (<div key={index}>
                            <label><div className={styles.answerTitle}>Odpowiedź nr : {index + 1}</div>
                                <textarea
                                    name={name}
                                    placeholder="Treść odpowiedzi"
                                    value={answerValue}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className={styles.correctAnswerTitle}>Prawidłowa:
                                <input onChange={(event) => {
                                    setCheckIndex(index)
                                    handleChange(event)
                                }} type="radio" name="correctAnswer"
                                       value={answerValue}
                                       checked={index === checkIndex}
                                       required
                                /></label><br/>
                        </div>
                    )
                })}
                <br/>
            <br/><br/><input onClick={handleSubmit} type="submit"/>
            <br/><br/>
            </form>
            <button onClick={handleAddAnswer}>Dodaj dodatkową opcje odpowiedzi</button>
            {answersQuantity > 2 ?
                <button onClick={handleRemoveLastAnswer}>Usuń ostatnią odpowiedź</button> : <div/>}
            <button className={styles.goBackButton} onClick={() => setGoBack(true)}>Wróć do listy</button>
        </div>
    )
}