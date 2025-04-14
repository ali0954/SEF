import React, { useContext } from 'react';
import { Transaction } from './Transaction.jsx';
import { GlobalContext } from '../context/GlobalState.jsx';

export const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);

  return (
    <div className="history-section">
      <h3>Transaction History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <Transaction 
            key={transaction.id} 
            transaction={transaction} 
          />
        ))}
      </ul>
    </div>
  );
};