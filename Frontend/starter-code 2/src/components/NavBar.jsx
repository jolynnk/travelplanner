import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const userRole = JSON.parse(localStorage.getItem("userRole")) || [];

  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Create Itinerary</NavLink>
          </li>
          <li>
            <NavLink to="/user-itineraries">Current Itineraries</NavLink>
          </li>
          <li>
            <NavLink to="/smart-itinerary">Smartinerary [Beta]</NavLink>
          </li>
          <li>
            <NavLink to="/login">Log in</NavLink>
          </li>
          <li>
            <NavLink to="/registration">Sign up</NavLink>
          </li>
          {userRole.includes("admin") && ( // Conditionally render Admin Dashboard link
            <li>
              <NavLink to="/admin-dashboard">Admin Dashboard</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
