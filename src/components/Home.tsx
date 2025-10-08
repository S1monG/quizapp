import {useNavigate} from "react-router-dom";
import {categories} from "../types/QuizTypes";

function Home() {

    const navigate = useNavigate();

    function categoriesList() {
        return [...categories]
            .sort((a, b) => a.localeCompare(b))
            .map((category) => ( <h4 className="p-1 text-xl text-center border border-blue-200 hover:bg-blue-100" 
                onClick={() => navigate("/quiz")}>{category}</h4>)
        );
    }

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-15">Welcome <br /> to <br />
                <span className="text-6xl font-bold text-blue-200 drop-shadow-[0_0_1px_black]" >GuessQuest</span></h1>
            <h3 className="text-xl text-center mt-10">Here at GuessQuest you can find several quiz categories with
                 different levels of difficulty, as well as viewing your results! </h3>
            <div className="grid grid-cols-3 gap-4 p-8 ">
                <div className="col-span-2">
                    <h2 className="bg-blue-200 p-4 text-2xl font-bold text-center">Categories</h2>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {categoriesList()}
                    </div>
                </div>
                <div>
                    <h2 className="bg-blue-200 p-4 text-2xl font-bold text-center">Results</h2>
                    <h4 className="p-1 text-xl text-center border border-blue-200 hover:bg-blue-100 gap-2 mt-2" 
                        onClick={() => navigate("/result")}>View you results</h4>
                    <h2 className="bg-blue-200 p-4 text-2xl font-bold text-center mt-2">Your progress</h2>
                    <h4 className="p-1 text-xl text-center gap-2 mt-2">Amount of Quizes played</h4>
                </div>
            </div>
        </div>
    )
}

export default Home