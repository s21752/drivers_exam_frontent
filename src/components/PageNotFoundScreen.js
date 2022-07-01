import noPageFound from '../ui/images/car_crash_with_outlines.png'
import styles from '../ui/styles/PageNotFoundScreen.module.css'

export default function PageNotFoundScreen(params) {

    return <div className={styles.content}>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <h1 className={styles.topText} >Błąd 404</h1>
        <img className={styles.picture} src={noPageFound}/>
        <br/><br/>
        <h2 className={styles.bottomText}>Strona o ścieżce {params.path} nie istnieje</h2>
    </div>
}