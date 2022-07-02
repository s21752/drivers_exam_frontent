import {Question} from "../data/model/Question";
import styles from '../ui/styles/EditableQuestion.module.css'
import {useNavigate} from "react-router";

export default function EditableQuestion(props) {

    let navigate = useNavigate()

    const question = new Question(
        props.data.content,
        props.data.allAnswers,
        props.data.correctAnswer,
        props.data.imageUrl,
        props.data.questionId)

    return (
        <div className={styles.mainDiv} onClick={() => {
            console.log(`Clicked question with id: ${question.questionId}`)
            navigate(`${question.questionId}`, { replace : true })
        }
        }>
            <h3>{question.content}</h3>
            <hr/>
        </div>
    )
}