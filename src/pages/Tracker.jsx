import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Header } from '../components/Header';
import { Balance } from '../components/Balance';
import { IncomeExpenses } from '../components/IncomeExpenses';
import { TransactionList } from '../components/TransactionList';
import { AddTransaction } from '../components/AddTransaction';
import { GlobalProvider } from '../context/GlobalState';
import { SpendingByCategory } from '../components/SpendingByCategory';
import Login from '../components/login';
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