import { useState } from "react"
import type { QuizData } from "@/types/QuizTypes"
import FetchQuizForm from "./FetchQuizForm"
import DisplayQuiz from "./DisplayQuiz"
import { useOutletContext } from "react-router-dom"

function QuizView() {

    const [currentQuiz, setCurrentQuiz] = useState<QuizData | null>(null)
    const [fetchView, setFetchView] = useState(true)
    const { setQuizResults, quizResults } = useOutletContext<{ setQuizResults: (quiz: QuizData[]) => void, quizResults: QuizData[] }>()

    return (
        <>
            <h1 className="text-6xl font-bold text-blue-200 drop-shadow-[0_0_1px_black] text-center mt-5 mb-5">Quiz</h1>
            {fetchView ? 
                <FetchQuizForm setCurrentQuiz={setCurrentQuiz} setFetchView={setFetchView} /> : 
                <DisplayQuiz quiz={currentQuiz as QuizData} quizResults={quizResults} setQuizResults={setQuizResults} setFetchView={setFetchView} />
            }
        </>
    )
}

export default QuizView