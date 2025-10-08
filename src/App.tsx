import { Route, Routes, Outlet, useOutletContext } from 'react-router-dom';
import Home from './components/Home';
import QuizView from './components/QuizView';
import { QuizData } from './types/QuizTypes';
import ResultView from './components/ResultView';
import NavBar from './components/NavBar';
import { useState } from 'react';

function App() {

  const [quizResults, setQuizResults] = useState<QuizData[]>([]);

  return (
    <>
      <NavBar />
      <Outlet context={{ quizResults, setQuizResults }} />
    </>
  )
}

export default App
