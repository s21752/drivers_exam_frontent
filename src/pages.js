import {useLocation} from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import PageNotFoundScreen from "./components/PageNotFoundScreen";
import EditScreenContent from "./components/EditScreenContent";
import QuestionEditionScreen from "./components/QuestionEditionScreen";
import AddNewQuestion from "./components/AddNewQuestion";
import ExamScreenContent from "./components/ExamScreenContent";
import PracticeScreenContent from "./components/PracticeScreenContent";

export function PageNotFound() {
    let location = useLocation();

    return <PageNotFoundScreen path={location.pathname}/>
}

export function AddNewQuestionPage() {
    return (
        <AddNewQuestion/>
    )
}

export function Exam() {
    return (
        <ExamScreenContent/>
    )
}

export function Practice() {
    return <PracticeScreenContent/>
}

export function QuestionsEdit() {
    return <EditScreenContent/>
}

export function SingleQuestionEdit() {
    let location = useLocation();
    let questionId = location.pathname.split("/").reverse()[0]

    return <QuestionEditionScreen questionId={questionId}/>
}

export function Home() {
    return <HomeScreen/>
}