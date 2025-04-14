// components/AddTransaction.jsx
import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const categories = [
  '🎓 Student Loan',
  '🍽️ Food & Drinks',
  '🎬 Entertainment',
  '🚗 Transport',
  '🛍️ Shopping',
  '💸 Bills',
  '📚 Education',
  '❓ Other'
];

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [isIncome, setIsIncome] = useState(true);
  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    
    if (isNaN(numericAmount)) return;

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: isIncome ? numericAmount : -numericAmount,
      category,
      date: new Date().toISOString()
    };

    addTransaction(newTransaction);
    setText('');
    setAmount('');
    setCategory(categories[0]);
    setIsIncome(true);
  };

  return (
    <div>
      <h3>Add New Transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Description: (Optional)</label>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Enter description..." 
          />
        </div>
        <div className="form-control">
          <label htmlFor="category">Category: </label>
          <select
            className="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <div className="amount-type-selector">
            <button
              type="button"
              className={`type-btn ${isIncome ? 'active' : ''}`}
              onClick={() => setIsIncome(true)}
            >
              Income
            </button>
            <button
              type="button"
              className={`type-btn ${!isIncome ? 'active' : ''}`}
              onClick={() => setIsIncome(false)}
            >
              Expense
            </button>
          </div>
          <label htmlFor="amount">Amount</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="Enter amount..." 
            min="0"
            step="0.01"
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </div>
  );
};