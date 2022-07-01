import styles from '../ui/styles/HomeScreen.module.css'
import manDriving from '../ui/images/man_driving.png'
import womanDriving from '../ui/images/woman_driving.png'

export default function HomeScreen() {
    return <div className={styles.container}>
        <h1 className={styles.greetings}>Witaj w Drivers Exam App!</h1>
        <br/><br/>
        <p>
            Wybierz interesującą Cię funkcję z menu widocznego powyżej.
        </p>
        <br/><br/><br/><br/>
        <div>
            <img src={manDriving} className={styles.leftPicture} />
            <img className={styles.rightPicture} src={womanDriving}/>
        </div>
    </div>
}