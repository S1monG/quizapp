import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import Home from './components/Home.js';
import ResultView from './components/ResultView.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import QuizView from './components/QuizView.js';

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "quiz", Component: QuizView },
      { path: "result", Component: ResultView }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
