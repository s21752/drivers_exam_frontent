import '../ui/styles/HomeScreen.css'
import manDriving from '../ui/images/man_driving.png'
import womanDriving from '../ui/images/woman_driving.png'

export default function HomeScreen() {
    return <div class="container">
        <h1 class="greetings">Witaj w egzaminie na prawo jazdy!</h1>
        <br/><br/>
        <p>
            Wybierz interesującą Cię funkcję z menu widocznego powyżej.
        </p>
        <br/><br/><br/><br/>
        <div>
            <img class='left-picture' src={manDriving}/>
            <img class='right-picture' src={womanDriving}/>
        </div>
    </div>
}