import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TransactionList from './components/TransactionList'
import TransactionDetail from './components/TransactionDetail'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TransactionList />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} />
      </Routes>
    </Router>
  )
}

export default App

