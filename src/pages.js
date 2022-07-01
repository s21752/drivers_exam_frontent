import {useLocation} from "react-router-dom";
import HomeScreen from "./components/HomeScreen";

export function PageNotFound() {
    let location = useLocation();

    return (
        <div>
            <h1>Nie znaleziono elementu: {location.pathname}</h1>
        </div>
    )
}

export function Exam() {
    return (
        <div>
            <h1>Exam screen</h1>
        </div>
    )
}

export function Practice() {
    return (
        <div>
            <h1>Practice screen</h1>
        </div>
    )
}

export function QuestionsEdit() {
    return (
        <div>
            <h1>Questions edition screen</h1>
        </div>
    )
}

export function Home() {
    return (
        <HomeScreen/>
    )
}