import React, { useState } from "react";
import "../Header/NavigationBar.css";
import { Link } from "react-router-dom";
import { List } from "react-bootstrap-icons";

function NavigationBar() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">📚 BookReview</Link>
      </div>

      <button
        className="navbar-toggle"
        onClick={() => setShowMenu(!showMenu)}
      >
        <List />
      </button>

      <ul className={`navbar-links ${showMenu ? "show" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/allbooks">All Books</Link></li>
          <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
