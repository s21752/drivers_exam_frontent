import {Link} from "react-router-dom";
import styles from '../ui/styles/NavigationHeader.module.css'

export default function NavigationHeader() {
    return <div className={styles.headerContent}>
        <h1 className={styles.appName}>Drivers exam app</h1>
        <div className={styles.navDivider}/>
        <nav className={styles.navContainer}>
            <div className={styles.navContent}>
                <div className={styles.pageLink}><Link to='exam'><h3>Egzamin</h3></Link></div>
                <div className={styles.linkDivider}/>
                <div className={styles.pageLink}><Link to='practice'><h3>Nauka</h3></Link></div>
                <div className={styles.linkDivider}/>
                <div className={styles.pageLink}><Link to='edit'><h3>Edycja</h3></Link></div>
            </div>
        </nav>
        <div className={`${styles.bottom} ${styles.navDivider}`}/>
    </div>
}