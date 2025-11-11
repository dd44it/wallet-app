import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import transactionsData from '../data/transactions.json'
import { Transaction } from '../types'
import { getDailyPoints, formatPoints } from '../utils/dailyPoints'
import { formatTransactionDate } from '../utils/dateUtils'
import { getIconForTransaction, getColorForTransaction } from '../utils/iconMapper'
import './TransactionList.css'

const CARD_LIMIT = 1500

function TransactionList() {
  const navigate = useNavigate()
  const [transactions] = useState<Transaction[]>(transactionsData as Transaction[])
  const [cardBalance] = useState<number>(() => Math.random() * 1000 + 200) // Random between 200-1200
  const [dailyPoints] = useState<number>(getDailyPoints())

  const available = CARD_LIMIT - cardBalance
  const latestTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)

  const handleTransactionClick = (id: string) => {
    navigate(`/transaction/${id}`)
  }

  // Assign icons and colors to transactions
  const transactionsWithIcons = latestTransactions.map((transaction, index) => {
    const icon = getIconForTransaction(transaction.name)
    const color = getColorForTransaction(transaction.name, index)
    return { ...transaction, icon, color }
  })

  return (
    <div className="transaction-list-container">
      <div className="transaction-list-content">
        {/* Top section with left and right blocks */}
        <div className="top-section">
          {/* Left side */}
          <div className="left-section">
            {/* Card Balance Block */}
            <div className="card-balance-block">
              <div className="card-balance-header">
                <FontAwesomeIcon icon={faCreditCard} className="card-icon" />
                <div className="card-balance-info">
                  <div className="card-balance-label">Card Balance</div>
                  <div className="card-balance-amount">${cardBalance.toFixed(2)}</div>
                </div>
              </div>
              <div className="card-balance-details">
                <div className="card-detail-item">
                  <span className="detail-label">Available</span>
                  <span className="detail-value">${available.toFixed(2)}</span>
                </div>
                <div className="card-detail-item">
                  <span className="detail-label">Maximum limit</span>
                  <span className="detail-value">${CARD_LIMIT.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Daily Points Block */}
            <div className="daily-points-block">
              <div className="daily-points-label">Daily Points</div>
              <div className="daily-points-value">{formatPoints(dailyPoints)}</div>
            </div>
          </div>

          {/* Right side */}
          <div className="right-section">
            {/* No Payment Due Block */}
            <div className="no-payment-due-block">
              <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
              <div className="no-payment-text">You're paid your balance</div>
            </div>
          </div>
        </div>

        {/* Latest Transactions Block */}
        <div className="latest-transactions-block">
          <div className="latest-transactions-header">Latest Transactions</div>
          <div className="transactions-list">
            {transactionsWithIcons.map((transaction) => {
              const dateStr = formatTransactionDate(transaction.date)
              const isPayment = transaction.type === 'Payment'
              const amountDisplay = isPayment 
                ? `+$${transaction.amount.toFixed(2)}` 
                : `-$${transaction.amount.toFixed(2)}`

              return (
                <div 
                  key={transaction.id} 
                  className="transaction-item"
                  onClick={() => handleTransactionClick(transaction.id)}
                >
                  <div 
                    className="transaction-icon" 
                    style={{ backgroundColor: transaction.color }}
                  >
                    <FontAwesomeIcon icon={transaction.icon} />
                  </div>
                  <div className="transaction-details">
                    <div className="transaction-header">
                      <span className="transaction-name">{transaction.name}</span>
                      <span className={`transaction-amount ${isPayment ? 'payment' : 'credit'}`}>
                        {amountDisplay}
                      </span>
                    </div>
                    <div className="transaction-meta">
                      {transaction.pending && (
                        <span className="pending-badge">Pending</span>
                      )}
                      {transaction.authorizedUser && (
                        <span className="authorized-user">{transaction.authorizedUser}</span>
                      )}
                      <span className="transaction-date">{dateStr}</span>
                    </div>
                    <div className="transaction-description">{transaction.description}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionList

