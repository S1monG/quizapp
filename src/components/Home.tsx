import { useNavigate } from "react-router-dom";
import { categories } from "../types/QuizTypes";
import { useOutletContext } from "react-router-dom";
import type { QuizData } from "@/types/QuizTypes";

function Home() {

    const navigate = useNavigate();

    const { quizResults } = useOutletContext<{ setQuizResults: (quiz: QuizData[]) => void, quizResults: QuizData[] }>();
    const uniquePlayedCategories = [...new Set(quizResults.map(q => q.results[0]?.category))]; //Get all unique quiz categories played (max 24)
    const amountUniquePlayed = uniquePlayedCategories.length;

    function categoriesNotPlayed() {
        return [...categories]
            .filter(category => !uniquePlayedCategories.includes(category))
            .sort(() => Math.random() - 0.5)        //Random order
            .slice(0, 6)                            //Max 6
            .map((category) => ( <h4 className="p-1 text-xl text-center border border-blue-200 hover:bg-blue-100" 
                onClick={() => navigate("/quiz")}>{category}</h4>)
            );
    }

    function categoriesList() {
        return [...categories]
            .sort((a, b) => a.localeCompare(b))
            .map((category) => ( <h4 className="p-1 text-xl text-center border border-blue-200 hover:bg-blue-100" 
                onClick={() => navigate("/quiz")}>{category}</h4>)
        );
    }

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-5">Welcome <br/> to <br/>
                <span className="text-6xl font-bold text-blue-200 drop-shadow-[0_0_1px_black]">GuessQuest</span></h1>
            <h3 className="text-xl text-center mt-5">Here at GuessQuest you can find several quiz categories with
                 different levels of difficulty, as well as viewing your results! </h3>
            <div className="grid grid-cols-3 gap-4 p-8 ">
                <div className="col-span-2">
                    <h2 className="bg-blue-200 p-4 text-2xl font-bold text-center">All Categories</h2>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {categoriesList()}
                    </div>
                </div>
                <div>
                    <h2 className="bg-blue-200 p-4 text-2xl font-bold text-center">Results</h2>
                    <h4 className="p-1 text-xl text-center border border-blue-200 hover:bg-blue-100 gap-2 mt-2" 
                        onClick={() => navigate("/result")}>View you results</h4>
                    <h2 className="bg-blue-200 p-4 text-2xl font-bold text-center mt-2">Your progress</h2>
                    <h3 className="text-xl text-center font-bold mt-5">
                        {amountUniquePlayed} / {categories.length} quizzes played </h3>

                    <div className="w-2/3 mx-auto bg-gray-200 rounded-full h-4 mt-1">
                        <div 
                            className="bg-blue-200 h-4 rounded-full" 
                            style={{ width: `${(amountUniquePlayed / categories.length) * 100}%` }}
                        ></div>
                    </div>
                     <h2 className="bg-blue-200 p-4 text-2xl font-bold text-center mt-5">Try a new category!</h2>
                     <div className="grid grid-cols-1 gap-2 mt-2">
                        {categoriesNotPlayed()}
                    </div>

                        

                </div>
            </div>
        </div>
    )
}

export default Home