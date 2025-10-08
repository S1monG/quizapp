import type { QuizData } from "../types/QuizTypes"
import FetchQuizForm from "./FetchQuizForm"

function QuizView() {

    return (
        <>
            <h1 className="text-4xl font-bold text-center">Quiz</h1>
            <FetchQuizForm />
        </>
    )
}

export default QuizView