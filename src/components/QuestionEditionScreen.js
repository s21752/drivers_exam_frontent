import {useEffect, useState} from "react";
import {Question} from "../data/model/Question";
import styles from '../ui/styles/QuestionEditionScreen.module.css'
import {useNavigate} from "react-router";

const getByIdUrl = 'https://localhost:7221/api/Questions/GetById?questionId='
const updateQuestionUrl = 'https://localhost:7221/api/Questions/Update'

export default function QuestionEditionScreen(props) {

    const currentUrl = getByIdUrl + props.questionId
    const [question, setQuestion] = useState(null)

    const [inputs, setInputs] = useState({})

    const [goBack, setGoBack] = useState(false)
    const [answersQuantity, setAnswersQuantity] = useState(question?.allAnswers.length || 2)
    const [checkIndex, setCheckIndex] = useState(question?.allAnswers.indexOf(question.correctAnswer))

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
        event.preventDefault()

        const imageUrl = inputs.imageUrl || null
        const content = inputs.questionContent || null
        let changedAnswers = []
        let answersChanged = false
        for (let i = 0; i < answersQuantity; i++) {
            let name = `answer${i}`
            let answer = inputs[name]
            if (answer !== null && answer) {
                answersChanged = true
                changedAnswers.push(answer)
            } else {
                changedAnswers.push(question.allAnswers[i])
            }
        }

        if (answersQuantity < question?.allAnswers.length) {
            answersChanged = true
        }
        const correctAnswer = changedAnswers[checkIndex]

        let updateObject = {
            Id: question?.questionId,
            Content: content,
            CorrectAnswer: correctAnswer,
            ImageUrl: imageUrl,
            Answers: answersChanged ? changedAnswers : null
        }

        let data = new FormData()
        data.append("Id", updateObject.Id)
        if (updateObject.Content !== null)
            data.append("Content", updateObject.Content)

        if (updateObject.CorrectAnswer !== null)
            data.append("CorrectAnswer", updateObject.CorrectAnswer)

        if (updateObject.ImageUrl !== null)
            data.append("ImageUrl", updateObject.ImageUrl)

        updateObject.Answers?.forEach((string) => {
            if (string !== "" && string !== "null")
                data.append("Answers", string)
        })

        fetch(updateQuestionUrl, {
            method: "PATCH",
            body: data
        }).then((response) => {
            if (response.ok) return
            throw new Error(`something went wrong while updating question`)
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

    useEffect(() => {
        fetch(currentUrl)
            .then((response) => {
                if (response.ok) return response.json()
                throw new Error(`something wrong while requesting question with id ${props.questionId}`)
            }).then((question) => {
            setCheckIndex(question?.allAnswers.indexOf(question.correctAnswer))
            setQuestion(new Question(question.content, question.allAnswers, question.correctAnswer, question.imageUrl, question.questionId))
            setAnswersQuantity(question.allAnswers.length)
        })
    }, [])

    let image = inputs.imageUrl || question?.imageUrl

    return (
        <div className={styles.content}>
            <form onSubmit={handleSubmit}>
                <label><h3>Treść pytania:</h3>
                    <textarea
                        name="questionContent"
                        placeholder={question?.content}
                        value={inputs.questionContent || ""}
                        onChange={handleChange}
                    />
                </label><br/><br/><br/>
                <label><h3>Adres url do obrazka:</h3>
                    <input
                        className={styles.imageUrlText}
                        type="text"
                        name="imageUrl"
                        placeholder={question?.imageUrl}
                        value={inputs.imageUrl || ""}
                        onChange={handleChange}
                    />
                </label><br/>
                {image !== null && image !== "" && image !== "null" ? <img className={styles.image} src={image}/> :
                    <div/>}<br/><br/>
                <h3>Wszystkie odpowiedzi:</h3>
                {new Array(answersQuantity).fill().map((_, index) => {
                    const name = `answer${index}`
                    const answerValue = inputs[name] || ""

                    return (<div key={index}>
                            <label><div className={styles.answerTitle}>Odpowiedź nr : {index + 1}</div>
                                <textarea
                                    name={name}
                                    placeholder={question?.allAnswers[index]}
                                    value={answerValue}
                                    onChange={handleChange}
                                    required={true}
                                />
                            </label>
                            <label className={styles.correctAnswerTitle}>Prawidłowa:
                                <input onChange={(event) => {
                                    setCheckIndex(index)
                                    handleChange(event)
                                }} type="radio" name="correctAnswer"
                                       value={answerValue}
                                       checked={index === checkIndex}
                                /></label><br/>
                        </div>
                    )
                })}
                <br/>
            </form>

            <button onClick={handleAddAnswer}>Dodaj odpowiedź</button>
            {answersQuantity > 2 ?
                <button onClick={handleRemoveLastAnswer}>Usuń ostatnią odpowiedź</button> : <div/>}
            <br/><br/><input onClick={handleSubmit} type="submit"/>
        </div>
    )
}