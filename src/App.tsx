import { Outlet } from 'react-router-dom';
import type { QuizData } from './types/QuizTypes';
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
