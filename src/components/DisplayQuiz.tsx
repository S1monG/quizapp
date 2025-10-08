import type { QuizData } from "@/types/QuizTypes"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type PropType = {
    quiz: QuizData
}
function DisplayQuiz( {quiz}: PropType ) {
    return (
        <>
            {quiz.results.map( (question, index) => (

                    <div className="p-1">
                        <Card>
                            <CardContent className="flex items-center justify-center p-6">
                                <span className="text-3xl font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                        </div>
                ))}
        </>

    )
}

export default DisplayQuiz