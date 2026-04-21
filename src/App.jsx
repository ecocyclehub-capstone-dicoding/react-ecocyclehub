import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      {/* Add more routes here as your app grows */}
    </Routes>
  )
}

export default App
