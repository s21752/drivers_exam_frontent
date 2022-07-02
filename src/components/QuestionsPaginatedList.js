import {useEffect, useState} from "react";
import styles from '../ui/styles/QuestionsPaginatedList.module.css'
import {Question} from "../data/model/Question";

const paginatedQuestionsUrl = 'https://localhost:7221/api/Questions/GetPaginated'

export default function QuestionsPaginatedList({dataLength, RenderComponent, maxPages, itemsPerPage}) {
    const pages = Math.ceil(dataLength / itemsPerPage)
    const [currentPage, setCurrentPage] = useState(1)
    const [questions, setQuestions] = useState([])

    const currentUrl = `${paginatedQuestionsUrl}?pageSize=${itemsPerPage}&pageIndex=${currentPage - 1}`

    useEffect(() => {
        fetch(currentUrl)
            .then((response) => {
                if (response.ok) return response.json()
                throw new Error('something wrong while requesting questions quantity')
            }).then((questions) => {
            //  logDataFetch(questions)

            setQuestions(questions.map((obj) => new Question(obj.content, obj.allAnswers, obj.correctAnswer, obj.imageUrl, obj.questionId)))
        })
    }, [currentPage])

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
        <h1>Wszyskie pytania ({dataLength})</h1>
        <div className={styles.content}>
            <div className={styles.dataContainer}>
                {questions.map((question, index) => (
                    <RenderComponent key={index} data={question}/>
                ))}
            </div>
            <div className={styles.pagination}>
                <button
                    onClick={goToPreviousPage}
                    className={`${styles.prev} ${currentPage === 1 ? styles.disabled : ''}`}
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
                    className={`${styles.next} ${currentPage === pages ? styles.disabled : ''}`}
                >
                    next
                </button>
            </div>
        </div>
    </div>
}

function logDataFetch(dataJson) {
    console.log(`Parsed ${JSON.stringify(dataJson)}`)
}