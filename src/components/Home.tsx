
function Home() {
    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-15">Welcome <br /> to <br />
                <span className="text-6xl font-bold text-blue-200 drop-shadow-[0_0_1px_black]" >GuessQuest</span></h1>
            <h3 className="text-xl text-center mt-10">Here at GuessQuest you can find several quiz categories with
                 different levels of difficulty, as well as viewing your results! </h3>
            <div className="grid grid-cols-2 gap-4 p-8">
                <div className="bg-blue-200 p-4 text-xl font-bold text-center">Categories</div>
                <div className="bg-blue-200 p-4 text-xl font-bold text-center">Results</div>
            </div>
        </div>
    )
}

export default Home