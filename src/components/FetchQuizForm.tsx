import type { QuizData } from "../types/QuizTypes"
import { Label } from "@/components/ui/label"
import { categories, CategoryMap, type Category } from "../types/QuizTypes"
import { useState, type FormEvent } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


type PropType = {
    setCurrentQuiz: (quiz: QuizData) => void
}
function FetchQuizForm( {setCurrentQuiz}: PropType ) {

    const [category, setCategory] = useState<Category | "">("")
    const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | "mixed">("mixed")
    const [type, setType] = useState<"multiple" | "boolean" | "mixed">("mixed")
    const [amount, setAmount] = useState(10)

    const fetchQuiz = async (e: FormEvent) => {
        e.preventDefault()

        const url = `https://opentdb.com/api.php?amount=${amount}` +
            (category ? `&category=${CategoryMap[category]}` : "") +
            (difficulty !== "mixed" ? `&difficulty=${difficulty}` : "") +
            (type !== "mixed" ? `&type=${type}` : "")

        console.log("Fetching quiz from URL:", url)

        const res = await fetch(url)
        const data : QuizData = await res.json()
        console.log(data)
        setCurrentQuiz(data)
    }

    return (
        <form className="flex flex-col gap-4">

            {/* Category selection */}
            <Label>
                <span className="text-base font-semibold -mb-1 mr-1">Category</span>
                <Select name="category" value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-sm">
                        <SelectValue placeholder="Choose a category" />
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

            {/* Difficulty selection */}
            <Label>
                <span className="text-base font-semibold -mb-1 mr-1">Difficulty</span>
                <Select name="difficulty" value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="w-sm">
                        <SelectValue placeholder="Choose a difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {["easy", "medium", "hard", "mixed"].map(difficulty => (
                                <SelectItem value={difficulty} key={difficulty}>
                                    {difficulty}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Label>

            {/* Type selection */}
            <Label>
                <span className="text-base font-semibold -mb-1 mr-1">Type</span>
                <Select name="type" value={type} onValueChange={setType}>
                    <SelectTrigger className="w-sm">
                        <SelectValue placeholder="Choose a type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {["multiple", "boolean", "mixed"].map(type => (
                                <SelectItem value={type} key={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Label>
            
            {/* Amount selection */}
            <Label>
                <span className="text-base font-semibold -mb-1 mr-1">Amount</span>
                <Input 
                    type="number" 
                    name="amount" 
                    value={amount} 
                    onChange={(e) => setAmount(parseInt(e.target.value))} 
                    className="w-24" 
                    min={1} 
                    max={50} 
                />
            </Label>

            <div className="flex items-center justify-end">
                <Button type="submit" onClick={fetchQuiz}>Get Quiz</Button>
            </div>
            
        </form>
    )
}

export default FetchQuizForm