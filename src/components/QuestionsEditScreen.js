import {useEffect, useState} from "react";
import QuestionsPaginatedList from "./QuestionsPaginatedList";
import EditableQuestion from "./EditableQuestion";
import styles from '../ui/styles/QuestionsEditScreen.module.css'

const questionsQuantityUrl = 'https://localhost:7221/api/Questions/GetCount'

const itemsPerPage = 11;
const pagesPerScreen = 5;

export default function QuestionsEditScreen() {

    const [questionsQuantity, setQuestionsQuantity] = useState(0)

    useEffect(() => {
        fetch(questionsQuantityUrl)
            .then((response) => {
                if (response.ok) return response.json()
                throw new Error('something wrong while requesting questions quantity')
            }).then((quantity) => {
            console.log(`Questions quantity is ${quantity}`)
            setQuestionsQuantity(Number(quantity))
        })
    }, [])

    return (
        <div className={styles.content}>
            <QuestionsPaginatedList dataLength={questionsQuantity} itemsPerPage={itemsPerPage} maxPages={pagesPerScreen}
                                    RenderComponent={EditableQuestion}/>
        </div>
    )
}