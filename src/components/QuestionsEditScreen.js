import QuestionsPaginatedList from "./QuestionsPaginatedList";
import EditableQuestion from "./EditableQuestion";
import styles from '../ui/styles/QuestionsEditScreen.module.css'

const itemsPerPage = 10;
const pagesPerScreen = 5;

export default function QuestionsEditScreen() {
    return (
        <div className={styles.content}>
            <QuestionsPaginatedList itemsPerPage={itemsPerPage} maxPages={pagesPerScreen}
                                    RenderComponent={EditableQuestion}/>
        </div>
    )
}