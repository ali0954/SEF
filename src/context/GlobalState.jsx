// context/GlobalState.jsx
import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  transactions: []
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children, userId }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Load transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/transactions/${encodeURIComponent(userId)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          throw new Error("Invalid response format");
        }

        const data = await response.json();
        dispatch({ type: 'SET_TRANSACTIONS', payload: data });
      } catch (error) {
        console.error('Error loading transactions:', error);
        dispatch({ type: 'SET_TRANSACTIONS', payload: [] });
      }
    };

    if (userId) fetchTransactions();
  }, [userId]);

  // Save transactions
  useEffect(() => {
    const saveTransactions = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/transactions/${encodeURIComponent(userId)}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state.transactions)
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to save: ${response.status}`);
        }
      } catch (error) {
        console.error('Error saving transactions:', error);
      }
    };

    if (userId && state.transactions !== initialState.transactions) {
      saveTransactions();
    }
  }, [state.transactions, userId]);

  // Actions
  function deleteTransaction(id) {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  }

  function addTransaction(transaction) {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  }

  return (
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      deleteTransaction,
      addTransaction
    }}>
      {children}
    </GlobalContext.Provider>
  );
};