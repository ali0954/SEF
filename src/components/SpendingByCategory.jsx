// components/SpendingByCategory.jsx
import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const SpendingByCategory = () => {
  const { transactions } = useContext(GlobalContext);

  // Calculate spending by category
  const spendingByCategory = transactions.reduce((acc, transaction) => {
    if (transaction.amount < 0) { // Only count expenses
      const category = transaction.category || 'Uncategorized';
      acc[category] = (acc[category] || 0) + Math.abs(transaction.amount);
    }
    return acc;
  }, {});

  // Convert to array and sort by amount (highest first)
  const sortedCategories = Object.entries(spendingByCategory)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="category-breakdown">
      <h3>Spending by Category</h3>
      {sortedCategories.length > 0 ? (
        <ul className="category-list">
          {sortedCategories.map(({ category, amount }) => (
            <li key={category} className="category-item">
              <span className="category-name">{category}</span>
              <span className="category-amount">£{amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No spending data available</p>
      )}
    </div>
  );
};