import React, { useEffect, useState } from "react";
import "../Header/NavigationBar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { List } from "react-bootstrap-icons";

function NavigationBar() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        await axios.get("http://localhost:5000/api/users/profile", {
          withCredentials: true,
        });
        setUserLoggedIn(true);
      } catch (err) {
        setUserLoggedIn(false);
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/logout", {}, {
        withCredentials: true,
      });
      setUserLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
        {userLoggedIn ? (
          <>
            <li><Link to="/profile">My Profile</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default NavigationBar;
