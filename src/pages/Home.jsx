import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/Home.css";
import Login from "../components/login.jsx";
import Logout from "../components/logout.jsx";
import ScreenReaderControls from "../components/ScreenReaderControls.jsx";

function Home() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <ScreenReaderControls />
          <h1 className="hero-title">Take Control of Your Finances</h1>
          <p className="hero-subtitle">
            The ultimate tool for students to track expenses, budget wisely, and plan their financial future.
          </p>
          {isAuthenticated ? (
            <Link to="/tracker">
              <button className="cta-button">Go to Tracker</button>
            </Link>
          ) : (
            <Login />
          )}
        </div>
      </header>

      <section className="features-section">
        <h2 className="features-title">Why Choose SEF?</h2>
        <div className="features-container">
          <div className="feature">
            <span className="emoji">💰</span>
            <h3>Budget Smarter</h3>
            <p>Create customised budgets to stay on top of your expenses.</p>
          </div>
          <div className="feature">
            <span className="emoji">📊</span>
            <h3>Track Expenses</h3>
            <p>Get insights into where your money is going and make better decisions.</p>
          </div>
          <div className="feature">
            <span className="emoji">📚</span>
            <h3>Financial Tips</h3>
            <p>Gain access to exclusive resources and save money effortlessly.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Let's Make Budgeting Easy!</h2>
        {isAuthenticated ? <Logout /> : <Login />}
      </section>

      <footer className="footer">
        <p>&copy; 2025 SEF - Student Expense Forecaster | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default Home;