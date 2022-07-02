import {SimplifiedQuestion} from "../data/model/SimplifiedQuestion";
import SimplifiedQuestionRepresentation from "./SimplifiedQuestionRepresentation";

export default function PracticeResults(props) {


    let state = props.state
    let mainDispatch = props.dispatcher

    let currentQuestion = state?.question

    const loadNext = () => {
        mainDispatch({ type : "START"})
    }

    let simplified = new SimplifiedQuestion(0, currentQuestion.content, currentQuestion.correctAnswer, state.answer)
    return <div>
        <SimplifiedQuestionRepresentation data={simplified}/>
        <button onClick={loadNext}>Ładuj następne</button>
    </div>

}