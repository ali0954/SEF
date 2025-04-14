import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/Nav.css";
import "../styles/AuthButtons.css"
import Login from "../components/login.jsx";
import Logout from "../components/logout.jsx";

const Nav = () => {
  const { isAuthenticated } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add this function to close the menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
    
    <Link to="/" className="logo-link">
      <img className="logo" src="/public/assets/Logo.png" alt="SEF Logo"/>
    </Link>
   
      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
        <li><Link to="/tracker" onClick={closeMenu}>Tracker</Link></li>
        <li><Link to="/goals" onClick={closeMenu}>Goals</Link></li>
        <li><Link to="/tips" onClick={closeMenu}>Resources</Link></li>
        <li className="auth-link">
      {isAuthenticated ? <Logout /> : <Login />}
    </li>
      </ul>
    </nav>
  );
};

export default Nav;