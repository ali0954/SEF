import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Header } from '../components/Header.jsx';
import { Balance } from '../components/Balance.jsx';
import { IncomeExpenses } from '../components/IncomeExpenses.jsx';
import { TransactionList } from '../components/TransactionList.jsx';
import { AddTransaction } from '../components/AddTransaction.jsx';
import { GlobalProvider } from '../context/GlobalState.jsx';
import { SpendingByCategory } from '../components/SpendingByCategory.jsx';
import Login from '../components/login.jsx';
import "../styles/Tracker.css";

function Tracker() {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <GlobalProvider userId={user.sub}>
          <TrackerContent />
        </GlobalProvider>
      ) : (
        <div className="auth-prompt">
          <h1>Please log in to access the Expense Tracker</h1>
          <Login />
        </div>
      )}
      <footer className="footer">
        <p>&copy; 2025 SEF - Student Expense Forecaster | All Rights Reserved</p>
      </footer>
    </div>
  );
}

const TrackerContent = () => {
  return (
    <>
      <Header />
      <div className="tracker-container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
        <SpendingByCategory />
      </div>
    </>
  );
};

export default Tracker;