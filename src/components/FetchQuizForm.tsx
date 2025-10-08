import { QuizData } from "../types/QuizTypes"

function FetchQuizForm() {

    const fetchQuiz = async () => {
        const res = await fetch("https://opentdb.com/api.php?amount=10")
        const data : QuizData = await res.json()
        console.log(data)
    }

    return (
        <></>
    )
}