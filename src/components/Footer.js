import styles from '../ui/styles/Footer.module.css';

export default function Footer() {

    return <>
        <div className={styles.mainFooter}>
            <div className={styles.dividerMargin}/>
            <div className={styles.authorInfoDivider}/>
            <h3 className={styles.authorInfo}>&copy;{new Date().getFullYear()} Cezary Graban | s21752 </h3>
        </div>
    </>
}