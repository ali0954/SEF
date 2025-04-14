import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import Tracker from "./pages/Tracker.jsx"; 
import GoalsPage from "./pages/GoalsPage.jsx"; 
import ProfilePage from "./pages/profilepage.jsx"; 
import Tips from "./pages/Tips.jsx";
import "./index.css";


function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tips" element={<Tips />} />
      </Routes>
    </Router>
  );
}

export default App;