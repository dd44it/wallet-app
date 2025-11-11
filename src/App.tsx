import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TransactionList from './components/TransactionList'
import TransactionDetail from './components/TransactionDetail'
import './App.css'

// Get base path from import.meta.env (set by Vite)
const basePath = import.meta.env.BASE_URL || '/'

function App() {
  return (
    <Router basename={basePath}>
      <Routes>
        <Route path="/" element={<TransactionList />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} />
      </Routes>
    </Router>
  )
}

export default App

