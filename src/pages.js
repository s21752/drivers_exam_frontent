import {useLocation} from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import PageNotFoundScreen from "./components/PageNotFoundScreen";
import QuestionsEditScreen from "./components/QuestionsEditScreen";
import QuestionEditionScreen from "./components/QuestionEditionScreen";

export function PageNotFound() {
    let location = useLocation();

    return <PageNotFoundScreen path={location.pathname}/>
}

export function Exam() {
    return (
        <div>
            <h1>Exam screen</h1>
        </div>
    )
}

export function Practice() {
    return <div>
        <h1>Practice screen</h1>
    </div>
}

export function QuestionsEdit() {
    return <QuestionsEditScreen/>
}

export function SingleQuestionEdit() {
    let location = useLocation();
    let questionId = location.pathname.split("/").reverse()[0]

    return <QuestionEditionScreen questionId={questionId}/>
}

export function Home() {
    return <HomeScreen/>
}