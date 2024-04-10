import React, { useState } from "react";
import "./Navbar.css";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function SecondNavbardropdown(props) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // Show the dropdown menu
  const showDropdown = () => {
    setIsDropdownVisible(true);
  };

  // Hide the dropdown menu
  const hideDropdown = () => {
    setIsDropdownVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  };

  return (
    <nav className="nav2">
      <ul>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <Link to="/AboutUs">About</Link>
        </li>
        <li>
          <Link to="/ContactUs">Contact</Link>
        </li>
        <li
          className="dropdown"
          onMouseEnter={showDropdown}
          onMouseLeave={hideDropdown}
        >
          <Link className="dropbtn">
            {" Hello, "}
            {props.username}
            <img
              src="dropdown.png"
              alt=""
              style={{ width: "15px", marginLeft: "6px", background: "white" }}
            />
          </Link>
          {isDropdownVisible && (
            <div className="dropdown-content">
              <Link
                to={
                  user && user.usertype === "collector"
                    ? "/collector-dashboard"
                    : "/seller-dashboard"
                }
              >
                Dashboard
              </Link>
              <Link to="/profile">Profile</Link>
              <Link to="/track-order">Track Order</Link>
              <a onClick={handleLogout} href="/login">
                Logout
              </a>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default SecondNavbardropdown;
