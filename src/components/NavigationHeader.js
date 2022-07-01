import {Link} from "react-router-dom";
import '../ui/styles/NavigationHeader.css'

export default function NavigationHeader() {
    return <div class='header-content'>
        <h1 class='app-name'>Drivers exam app</h1>
        <nav class='nav-container'>
            <div class="nav-content">
                <div class="page-link"><Link to='exam'><h3>Egzamin</h3></Link></div>
                <div class="page-link"><Link to='practice'><h3>Nauka</h3></Link></div>
                <div class="page-link"><Link to='edit'><h3>Edycja</h3></Link></div>
            </div>
        </nav>
    </div>
}