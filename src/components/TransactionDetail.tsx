import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import transactionsData from '../data/transactions.json'
import { Transaction } from '../types'
import { formatTransactionDateTime } from '../utils/dateUtils'
import './TransactionDetail.css'

function TransactionDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState<Transaction | null>(null)

  useEffect(() => {
    const found = (transactionsData as Transaction[]).find(t => t.id === id)
    if (found) {
      setTransaction(found)
    }
  }, [id])

  if (!transaction) {
    return (
      <div className="transaction-detail-container">
        <div className="transaction-not-found">Transaction not found</div>
      </div>
    )
  }

  const isPayment = transaction.type === 'Payment'
  const amountDisplay = isPayment 
    ? `+$${transaction.amount.toFixed(2)}` 
    : `-$${transaction.amount.toFixed(2)}`

  return (
    <div className="transaction-detail-container">
      <div className="transaction-detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>

      <div className="transaction-detail-content">
        {/* Transaction Number */}
        <div className="transaction-number">Transaction #{transaction.id}</div>

        {/* Amount */}
        <div className={`transaction-detail-amount ${isPayment ? 'payment' : 'credit'}`}>
          {amountDisplay}
        </div>

        {/* Transaction Name */}
        <div className="transaction-detail-name">{transaction.name}</div>

        {/* Date */}
        <div className="transaction-detail-date">
          {formatTransactionDateTime(transaction.date)}
        </div>

        {/* Card Info Block */}
        <div className="card-info-block">
          <div className="card-info-header">
            <FontAwesomeIcon icon={faCreditCard} className="card-info-icon" />
            <span className="card-info-title">Card Information</span>
          </div>
          
          <div className="card-info-details">
            <div className="card-info-row">
              <span className="card-info-label">Status:</span>
              <span className={`card-info-status ${transaction.status?.toLowerCase()}`}>
                {transaction.status || 'Pending'}
              </span>
            </div>
            
            <div className="card-info-row">
              <span className="card-info-label">Bank:</span>
              <span className="card-info-value">{transaction.bank || 'N/A'}</span>
            </div>
            
            <div className="card-info-row">
              <span className="card-info-label">Card:</span>
              <span className="card-info-value">{transaction.cardNumber || 'N/A'}</span>
            </div>
            
            <div className="card-info-row total-row">
              <span className="card-info-label">Total:</span>
              <span className="card-info-total">${transaction.amount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Transaction Description */}
        {transaction.description && (
          <div className="transaction-detail-description">
            <div className="description-label">Description</div>
            <div className="description-text">{transaction.description}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionDetail

