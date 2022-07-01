import Footer from "./components/Footer";
import NavigationHeader from "./components/NavigationHeader";
import './ui/styles/App.css';
import RoutesHandler from "./components/RoutesHandler";

export default function App() {

    return (
        <div class="page-container">
            <NavigationHeader class="nav-header"/>
            <RoutesHandler class="main-content"/>
            <Footer class="main-footer"/>
        </div>);
}