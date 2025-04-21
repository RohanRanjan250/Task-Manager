import { Routes, Route } from 'react-router-dom'
import './App.css'
import TodoList from './components/TodoList'
import PomodoroTimer from './components/PomodoroTimer'
import Navigation from './components/Navigation'

function App() {
  return (
    <div className="app-wrapper">
      <aside className="app-sidebar">
        <h1 className="app-title">Task Manager</h1>
        <Navigation />
      </aside>
      
      <main className="app-main">
        <div className="content-container">
          <Routes>
            <Route path="/" element={<TodoList mode="add" />} />
            <Route path="/timer" element={<PomodoroTimer />} />
            <Route path="/all-tasks" element={<TodoList mode="all" />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App