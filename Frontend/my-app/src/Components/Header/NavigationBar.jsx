import React from "react";
import "../Header/NavigationBar.css";
import { Link } from 'react-router-dom';
function NavigationBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">📚 BookReview</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/allbooks">All Books</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );

}

export default NavigationBar;
