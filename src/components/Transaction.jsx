import React, { useContext } from 'react'; // Add useContext import
import { GlobalContext } from '../context/GlobalState';
import "../styles/Tracker.css";

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  // Date formatting function
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
    };
    return new Date(dateString).toLocaleString('en-GB', options);
  };

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      <div className="transaction-content">
        <div>
          <span className="transaction-text">{transaction.text}</span>
          <span className="transaction-category">{transaction.category}</span>
        </div>
        <span className="transaction-amount">
          £{Math.abs(transaction.amount).toFixed(2)}
        </span>
        <span className="transaction-date">
          {formatDate(transaction.date)}
        </span>
      </div>
      <button
        onClick={() => deleteTransaction(transaction.id)}
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
};