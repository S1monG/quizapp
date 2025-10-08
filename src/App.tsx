import { Route, Routes, Outlet } from 'react-router-dom';
import Home from './components/Home';
import QuizView from './components/QuizView';
import ResultView from './components/ResultView';
import NavBar from './components/NavBar';

function App() {

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default App
