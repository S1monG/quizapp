import { useState } from "react"
import type { QuizData } from "@/types/QuizTypes"
import FetchQuizForm from "./FetchQuizForm"
import DisplayQuiz from "./DisplayQuiz"

function QuizView() {

    const [currentQuiz, setCurrentQuiz] = useState<QuizData | null>(null)

    return (
        <>
            <h1 className="text-4xl font-bold text-center">Quiz</h1>
            <FetchQuizForm setCurrentQuiz={setCurrentQuiz} />
            {currentQuiz && (<DisplayQuiz quiz={currentQuiz} />)}
        </>
    )
}

export default QuizView