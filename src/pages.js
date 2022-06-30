import {useLocation} from "react-router-dom";

export function PageNotFound() {
    let location = useLocation();

    return (
        <div>
            <h1>Nie znaleziono elementu: {location.pathname}</h1>
        </div>
    )
}

export function Home() {
    return (
        <div>
            <h1>Home screen</h1>
        </div>
    )
}