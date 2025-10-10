import type { QuizData } from "@/types/QuizTypes"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

type PropType = {
    quiz: QuizData
    quizResults: QuizData[]
    setQuizResults: (quiz: QuizData[]) => void
    setFetchView: (b: boolean) => void
}
function DisplayQuiz( {quiz, quizResults, setQuizResults, setFetchView}: PropType ) {

    const [quizAnswer, setQuizAnswer] = useState<string[]>(Array(quiz.results.length).fill(""))
    const [quizQuestions, setQuizQuestions] = useState<string[][]>([])

    useEffect(() => {
        setQuizQuestions(quiz.results.map((result) => {
            return [...result.incorrect_answers, result.correct_answer]
                .sort(() => Math.random() - 0.5)
        }))
    }, [quiz])

    const submitQuiz = () => {
        const newResult = { ...quiz }
        quiz.results.forEach( (result, index) => {
            result.userAnswer = quizAnswer[index]
        })
        setQuizResults([...quizResults, newResult])
        setFetchView(true)
    }

    return (
        <>
            {quiz.results.map( (result, index) => (

                    <div className="p-1" key={index}>
                        <Card>
                            <CardContent className="items-center justify-center p-6">
                                
                                <div className="text-2xl font-semibold text-center mb-4">
                                    {decodeHTML(result.question)}
                                </div>

                                <div className="items-center justify-center grid grid-cols-2 gap-4">
                                    { quizQuestions[index]?.map((answer, answerIndex) => (
                                            <Button
                                                key={index.toString() + answerIndex.toString()}
                                                variant={ quizAnswer[index] === answer ? "default" : "outline" }
                                                onClick={ () => {
                                                    const newAnswers = [...quizAnswer]
                                                    newAnswers[index] = answer
                                                    setQuizAnswer(newAnswers)
                                                } }
                                            >
                                                {decodeHTML(answer)}
                                            </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
            ))}

            <div className="mt-4 ml-5">
                <Button onClick={submitQuiz}>Submit Quiz</Button>
            </div>
        </>

    )
}

function decodeHTML(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html")
  return doc.documentElement.textContent || ""
}

export default DisplayQuiz