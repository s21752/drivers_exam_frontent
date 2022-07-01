import Footer from "./components/Footer";
import NavigationHeader from "./components/NavigationHeader";
import styles from './ui/styles/App.module.css';
import RoutesHandler from "./components/RoutesHandler";

export default function App() {

    return (
        <div className={styles.pageContainer}>
            <NavigationHeader className={styles.navHeader}/>
            <RoutesHandler className={styles.mainContent}/>
            <Footer className={styles.mainFooter}/>
        </div>);
}