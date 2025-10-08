import { useEffect } from "react"

export type Difficulty = "easy" | "medium" | "hard"

export type QuizData = {
    results : {
        category: string,
        correct_answer: string,
        difficulty: Difficulty,
        incorrect_answers: string[],
        question: string,
        type: "multiple" | "boolean"
        userAnswer?: string
    }[]
}

function QuizView() {

    const fetchQuiz = async () => {
        const res = await fetch("https://opentdb.com/api.php?amount=10")
        const data : QuizData = await res.json()
        console.log(data)
    }

    useEffect(() => {
        fetchQuiz()
    }, [])

    return (
        <h1 className="text-4xl font-bold text-center">Quiz</h1>
    )
}

export default QuizView