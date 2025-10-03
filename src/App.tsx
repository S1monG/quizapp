import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import QuizView from './components/QuizView';
import ResultView from './components/ResultView';
import NavBar from './components/NavBar';

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizView />} />
        <Route path="/result" element={<ResultView />} />
      </Routes>
    </>
  )
}

export default App
