import {useEffect, useState} from "react";
import styles from '../ui/styles/QuestionsPaginatedList.module.css'
import {Question} from "../data/model/Question";
import {useNavigate} from "react-router";

const paginatedQuestionsUrl = 'https://localhost:7221/api/Questions/GetPaginated'
const questionsQuantityUrl = 'https://localhost:7221/api/Questions/GetCount'

export default function QuestionsPaginatedList({RenderComponent, maxPages, itemsPerPage}) {
    const [currentPage, setCurrentPage] = useState(1)
    const [questions, setQuestions] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [currentDataLength, setCurrentDataLength] = useState(0)
    const [goToNewQuestion, setGoToNewQuestion] = useState(false)

    const pages = Math.ceil(currentDataLength / itemsPerPage)

    const currentUrl = `${paginatedQuestionsUrl}?pageSize=${itemsPerPage}&pageIndex=${currentPage - 1}`

    let navigate = useNavigate()
    useEffect(() => {
        const goToAddQuestion = () => {
            navigate("/edit/new")
        }

        if (goToNewQuestion)
            goToAddQuestion()
    }, [goToNewQuestion])

    useEffect(() => {
        fetch(questionsQuantityUrl)
            .then((response) => {
                if (response.ok) return response.json()
                throw new Error('something wrong while requesting questions quantity')
            }).then((quantity) => {
            console.log(`Questions quantity is ${quantity}`)
            setCurrentDataLength(Number(quantity))
        })
    }, [refresh])

    useEffect(() => {
        fetch(currentUrl)
            .then((response) => {
                if (response.ok) return response.json()
                throw new Error('something wrong while requesting questions quantity')
            }).then((questions) => {
            //  logDataFetch(questions)

            setQuestions(questions.map((obj) => new Question(obj.content, obj.allAnswers, obj.correctAnswer, obj.imageUrl, obj.questionId)))
        })
    }, [currentPage, refresh])

    function goToNextPage() {
        setCurrentPage((page) => page + 1)
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1)
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent)
        setCurrentPage(pageNumber)
    }

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / maxPages) * maxPages

        let numberOfAllPagesMinusFullMaxPages = pages - (maxPages * Math.floor((currentPage - 1) / maxPages))

        return new Array(Math.min(numberOfAllPagesMinusFullMaxPages, maxPages)).fill().map((_, index) => start + index + 1)
    };

    return <div className={styles.mainDiv}>
        <button className={styles.addQuestionButton } onClick={() => setGoToNewQuestion(true)}>Add new question</button>
        <h1>Wszyskie pytania ({currentDataLength})</h1>
        <div className={styles.content}>
            <div className={styles.dataContainer}>
                {questions.map((question, index) => (
                    <RenderComponent key={index} data={question} refreshHandle={setRefresh}/>
                ))}
            </div>
            <div className={styles.pagination}>
                <button
                    onClick={goToPreviousPage}
                    className={`${styles.prev} ${currentPage === 1 || currentDataLength === 0 ? styles.disabled : ''}`}
                >
                    prev
                </button>
                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`${styles.paginationItem} ${currentPage === item ? styles.active : null}`}
                    >
                        <span>{item}</span>
                    </button>
                ))}
                <button
                    onClick={goToNextPage}
                    className={`${styles.next} ${currentPage === pages || currentDataLength === 0 ? styles.disabled : ''}`}
                >
                    next
                </button>
            </div>
        </div>
    </div>
}