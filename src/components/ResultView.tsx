import type { QuizData } from "@/types/QuizTypes";
import React, {useState, useMemo} from "react";
import { useOutletContext } from "react-router-dom";

type PropsType = { 
    quizResults: QuizData[];
    setQuizResults: (results: QuizData[]) => void;
};

function ResultView() {
    const { quizResults } = useOutletContext<PropsType>() || { quizResults: []};
    const [sortBy, setSortBy] = useState<"category" | "difficulty" | "result" | "correctFirst" | "correctLast">("category");

    const categoryStats = quizResults.reduce((acc, quiz) => {
        quiz.results.forEach((res) => {
            const cat = res.category;
            if (!acc[cat]) {
                acc[cat] = { total: 0, correct: 0, difficulty: res.difficulty };
            }
            acc[cat].total++;
            if (res.userAnswer === res.correct_answer) acc[cat].correct++;
        });
        return acc;
    }, {} as Record<string, { total: number; correct: number; difficulty: string }>);

    const sortedStats = useMemo(() => {
        const entries = quizResults.flatMap(quiz => {
            const correctCount = quiz.results.filter(q => q.userAnswer === q.correct_answer).length;
            const totalCount = quiz.results.length;
            const difficultySet = new Set(quiz.results.map(q => q.difficulty));
            const difficulty = difficultySet.size === 1 ? quiz.results[0].difficulty : "mixed"; //Denna är något problematisk dock
            const categorySet = new Set(quiz.results.map(q => q.category));
            const category = categorySet.size === 1 ? quiz.results[0].category : "mixed";

            return { category, difficulty, correct: correctCount, total: totalCount };
        });

        switch (sortBy) {
            case "category":
                return entries.sort((a, b) => a.category.localeCompare(b.category));
            case "difficulty":
                const diffOrder = ["easy", "medium", "hard", "mixed"];
                return entries.sort((a, b) => diffOrder.indexOf(a.difficulty) - diffOrder.indexOf(b.difficulty));
            case "result":
                return entries.sort((a, b) => (b.correct / b.total) - (a.correct / a.total));
            default:
                return entries;
        }
    }, [categoryStats, sortBy]);
  
    
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

                {sortedStats.map((stats, index) => (

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
                ))}
            </div>          
        </div>
    )
}

export default ResultView