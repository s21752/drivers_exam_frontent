import styles from '../ui/styles/EditableQuestion.module.css'
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";

const questionDeleteUrl = 'https://localhost:7221/api/Questions/Delete?id='

export default function EditableQuestion(props) {

    const question = props.data
    const [sendDeleteRequest, setSendDeleteRequest] = useState(false)

    const currentDeleteUrl = questionDeleteUrl + question?.questionId

    useEffect(() => {
        const deleteQuestion = () => {
            fetch(currentDeleteUrl, {
                method: "DELETE",
            }).then((response) => {
                if (response.ok) return
                throw new Error('Something went wrong during deleting question')
            }).then(() => {
                props.refreshHandle((previousState) => !previousState)
            })
        }

        if (sendDeleteRequest)
            deleteQuestion()
    }, [sendDeleteRequest])

    let navigate = useNavigate()

    return (
        <div>
            <div className={styles.mainDiv}>
                <h3 onClick={() => {
                    console.log(`Clicked question with id: ${question.questionId}`)
                    navigate(`${question.questionId}`, {replace: true})
                }
                } className={styles.questionContent}>{question.content}</h3>
                <button onClick={() => {
                    setSendDeleteRequest(true)
                }}>Delete question
                </button>
            </div>
            <hr/>
        </div>
    )
}