import type { QuizData } from "../types/QuizTypes"
import { Label } from "./ui/label"
import { categories, type Category } from "../types/QuizTypes"
import { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

function FetchQuizForm() {

    const [category, setCategory] = useState<Category | "">("")

    const fetchQuiz = async () => {
        const res = await fetch("https://opentdb.com/api.php?amount=10")
        const data : QuizData = await res.json()
        console.log(data)
    }

    return (
        <form className="flex flex-col gap-4">
            <Label>
                <span className="text-base font-semibold -mb-1 mr-1">category</span>
                <Select name="category" value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-sm">
                        <SelectValue placeholder="Välj en kategori" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {categories.map(category => (
                                <SelectItem value={category} key={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Label>
        </form>
    )
}

export default FetchQuizForm