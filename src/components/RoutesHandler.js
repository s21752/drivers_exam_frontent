import '../ui/styles/RoutesHandler.css'
import {useRoutes} from "react-router";
import {Exam, Home, PageNotFound, Practice, QuestionsEdit} from "../pages";

export default function RoutesHandler() {
    let element = useRoutes([
        {path: "/", element: <Home/>},
        {path: "exam", element: <Exam/>},
        {path: "practice", element: <Practice/>},
        {path: "edit", element: <QuestionsEdit/>},
        {path: "*", element: <PageNotFound/>},
    ]);

    return <div class='content'>
        {element}
    </div>;
}