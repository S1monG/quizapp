import type { QuizData } from "@/types/QuizTypes";
import React, {useState, useMemo} from "react";
import { useOutletContext } from "react-router-dom";

type PropsType = { 
    quizResults: QuizData[];
};

function ResultView() {
    const { quizResults } = useOutletContext<PropsType>() || { quizResults: []};
    const [sortBy, setSortBy] = useState<"category" | "difficulty" | "result">("category");

    const sortedStats = useMemo(() => {
        const entries = quizResults.map(quiz => {
            const category = quiz.results[0].category;
            const difficultySet = new Set(quiz.results.map(q => q.difficulty));
            const difficulty = difficultySet.size === 1 ? quiz.results[0].difficulty : "mixed";
            const correctCount = quiz.results.filter(q => q.userAnswer === q.correct_answer).length;
            const totalCount = quiz.results.length;
            
            return { category, difficulty, correct: correctCount, total: totalCount };
        });

        const diffOrder = ["easy", "medium", "hard", "mixed"];

        switch (sortBy) {
            case "category":
                return entries.sort((a, b) => a.category.localeCompare(b.category));
            case "difficulty":
                return entries.sort((a, b) => diffOrder.indexOf(a.difficulty) - diffOrder.indexOf(b.difficulty));
            case "result":
                return entries.sort((a, b) => (b.correct / b.total) - (a.correct / a.total));
            default:
                return entries;
        }
    }, [quizResults, sortBy]);
  
    
    return (
        <div>
            <h1 className="text-6xl mt-5 font-bold text-center text-blue-200 drop-shadow-[0_0_1px_black]">Result</h1>

            <div className="ml-10 mt-10 mb-4">
                <label className="mr-2 font-medium">Sort by:</label>
                <select className="border rounded p-1" value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
                    <option value="category">Category (A-Z)</option>
                    <option value="difficulty">Difficulty (easy → hard)</option>
                    <option value="result">Result (highest → lowest)</option>
                </select>
            </div>

            <div className="grid grid-cols-[1fr_1fr_150px] ml-10 mr-10 mt-4 border border-gray-500 text-left">
                <div className="font-bold bg-blue-200 p-2">Category</div>
                <div className="font-bold bg-blue-200 p-2">Difficulty</div>
                <div className="font-bold bg-blue-200 p-2">Result</div>

                {sortedStats.length === 0 ? (
                    <div className="col-span-3 text-center text-gray-600 p-6">
                        No results yet. Take a quiz to see your results here!
                    </div>
                ) : (

                sortedStats.map((stats, index) => (

                    <React.Fragment key={index}>
                        <div className={`p-2 ${index % 2 === 0 ? "bg-blue-50" : "bg-white"}`}>
                            {stats.category} 
                        </div>
                        <div className={`p-2 ${index % 2 === 0 ? "bg-blue-50" : "bg-white"}`}>{stats.difficulty}</div>
                        <div className={`p-2 ${index % 2 === 0 ? "bg-blue-50" : "bg-white"}`}>
                            {stats.correct} / {stats.total} correct
                        </div>

                        {index < sortedStats.length -1 && (
                            <div className="col-span-3 border-t border-gray-300"></div>
                        )}
                    </React.Fragment>
                ))
            )}
            </div>          
        </div>
    )
}

export default ResultView