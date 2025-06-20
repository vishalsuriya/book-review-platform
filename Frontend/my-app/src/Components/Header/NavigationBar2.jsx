import React, { useEffect, useState } from "react";
import "../Header/NavigationBar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { List } from "react-bootstrap-icons";

function NavigationBar() {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await axios.get("https://book-review-platform-server-cfuk.onrender.com/api/users/profile", {
          withCredentials: true,
        });
        setUser(data);
      } catch (err) {
        setUser(null);
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("https://book-review-platform-server-cfuk.onrender.com/api/users/logout", {}, {
        withCredentials: true,
      });
      setUser(null);
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
        <li><Link to="/userlogin">Home</Link></li>
        <li><Link to="/allbooks">All Books</Link></li>
        {user ? (
          <>
            {user.isAdmin ? (
              <li><Link to="/addbook">Add Book</Link></li>
            ) : (
              <li><Link to="/profile">My Profile</Link></li>
            )}
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
