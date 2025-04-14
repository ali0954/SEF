import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../components/login.jsx";
import "../styles/Goals.css";

const GoalsPage = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [amount, setAmount] = useState("");
  const [celebrateGoal, setCelebrateGoal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // At the start of fetchGoals
setError(null);
    const fetchGoals = async () => {
      if (isAuthenticated && user?.sub) {
        try {
          const userId = encodeURIComponent(user.sub);
          const response = await fetch(`/api/goals/${userId}`);
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to load goals');
          }
          
          const data = await response.json();
          setGoals(data);
        } catch (err) {
          setError(err.message);
          console.error('API Error:', err);
        } finally {
          setLoadingGoals(false);
        }
      }
    };
  
    if (isAuthenticated) {
      fetchGoals();
    } else {
      setLoadingGoals(false);
    }
  }, [isAuthenticated, user]);

  const saveGoals = async (updatedGoals) => {
    try {
      if (!user?.sub) return;
      
      const response = await fetch(`/api/goals/${encodeURIComponent(user.sub)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGoals),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save goals');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const addGoal = async () => {
    if (newGoal && amount) {
      const updatedGoals = [...goals, { 
        name: newGoal, 
        amount: parseFloat(amount), 
        progress: 0 
      }];
      
      setGoals(updatedGoals);
      await saveGoals(updatedGoals);
      
      setNewGoal("");
      setAmount("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    }
  };

  const updateProgress = async (index, value) => {
    const updatedGoals = [...goals];
    const goal = updatedGoals[index];
    const previousProgress = goal.progress;
    const newValue = Math.min(parseFloat(value), goal.amount);
    goal.progress = newValue;
  
    setGoals(updatedGoals);
    await saveGoals(updatedGoals);
  
    // Check if the goal was just completed
    if (previousProgress < goal.amount && newValue >= goal.amount) {
      setCelebrateGoal(true);
      setTimeout(() => setCelebrateGoal(false), 1500);
    }
  };
  
  const updateProgressWithSlider = async (index, value) => {
    const updatedGoals = [...goals];
    const goal = updatedGoals[index];
    const previousProgress = goal.progress;
    const newValue = Math.min(value, goal.amount);
    goal.progress = newValue;
  
    setGoals(updatedGoals);
    await saveGoals(updatedGoals);
  
    // Check if the goal was just completed
    if (previousProgress < goal.amount && newValue >= goal.amount) {
      setCelebrateGoal(true);
      setTimeout(() => setCelebrateGoal(false), 1500);
    }
  };

  const deleteGoal = async (index) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      const updatedGoals = goals.filter((_, i) => i !== index);
      setGoals(updatedGoals);
      await saveGoals(updatedGoals);
    }
  };

  const handleResetGoals = async () => {
    if (window.confirm("Are you sure you want to reset all goals?")) {
      setGoals([]);
      await saveGoals([]);
    }
  };

  if (isLoading || loadingGoals) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="goals-container">
      {celebrateGoal && (
        <div className="celebration-overlay">
          <span role="img" aria-label="celebration">🎉 Goal Achieved! 🎉</span>
        </div>
      )}

      {showSuccess && (
        <div className="success-message">
          <span role="img" aria-label="success">✅ Goal Added!</span>
        </div>
      )}

      {!isAuthenticated ? (
        <div className="auth-prompt">
          <h1>Please log in to manage your financial goals</h1>
          <Login />
        </div>
      ) : (
        <>
          <h1 className="specialh1">🎯 Financial Goals</h1>

          <div className="goal-input">
            <input
              type="text"
              placeholder="Goal Name (e.g., Save for Laptop)"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
            />
            <input
              type="number"
              placeholder="Target Amount (£)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button 
              className={`btn ${showSuccess ? 'success' : ''}`} 
              onClick={addGoal}
            >
              💰 Add Goal
            </button>
          </div>

          {goals.length === 0 ? (
            <p className="no-goals">You have no goals yet. Start by adding one! 🚀</p>
          ) : (
            <ul className="list">
              {goals.map((goal, index) => (
                <li key={index} className="goal-item">
                  <div className="goal-details">
                    <h3>{goal.name}</h3>
                    <p>Target: £{goal.amount}</p>
                    <progress 
                      value={goal.progress} 
                      max={goal.amount}
                      className={goal.progress >= goal.amount ? 'complete' : ''}
                    ></progress>
                    <p>Saved: £{goal.progress} / £{goal.amount}</p>
                    <div className="update-savings">
                      <input
                        type="number"
                        placeholder="Update Savings"
                        min="0"
                        max={goal.amount}
                        value={goal.progress}
                        onChange={(e) => updateProgress(index, parseFloat(e.target.value))}
                      />
                      <div className="slider-container">
                        <input
                          type="range"
                          min="0"
                          max={goal.amount}
                          value={goal.progress}
                          onChange={(e) => updateProgressWithSlider(index, parseFloat(e.target.value))}
                          className="slider"
                        />
                        <span className="slider-value">£{goal.progress}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="delete-btn" 
                    onClick={() => deleteGoal(index)}
                    aria-label={`Delete goal: ${goal.name}`}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button className="btn reset-btn" onClick={handleResetGoals}>
            🔄 Reset Goals
          </button>
        </>
      )}
      {error && <div className="error-message">⚠️ {error}</div>}
    </div>
  );
};

export default GoalsPage;