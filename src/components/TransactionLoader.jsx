// components/TransactionLoader.jsx
import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const TransactionLoader = ({ userId }) => {
  const { transactions, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/api/transactions/${encodeURIComponent(userId)}`);
        const data = await response.json();
        dispatch({ type: 'SET_TRANSACTIONS', payload: data });
      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    };

    if (userId) fetchTransactions();
  }, [userId, dispatch]);

  return null;
};