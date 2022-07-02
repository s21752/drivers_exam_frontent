import styles from '../ui/styles/RoutesHandler.module.css'
import {useRoutes} from "react-router";
import {AddNewQuestionPage, Exam, Home, PageNotFound, Practice, QuestionsEdit, SingleQuestionEdit} from "../pages";

export default function RoutesHandler() {
    let element = useRoutes([
        {path: "/", element: <Home/>},
        {path: "exam", element: <Exam/>},
        {path: "practice", element: <Practice/>},
        {path: "edit", element: <QuestionsEdit/>},
        {path: "edit/new", element: <AddNewQuestionPage/>},
        {path: "edit/*", element: <SingleQuestionEdit/>},
        {path: "*", element: <PageNotFound/>},
    ]);

    return <div className={styles.content}>
        {element}
    </div>;
}