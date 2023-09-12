import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const userRole = JSON.parse(localStorage.getItem("userRole")) || [];

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.appName}>
          <p>itinero</p>
        </div>
        <nav>
          <ul className={styles.navbarLinks}>
            {userRole.includes("user" || "admin") && (
              <li>
                <NavLink to="/">Create Itinerary</NavLink>
              </li>
            )}
            {userRole.includes("user" || "admin") && (
              <li>
                <NavLink to="/user-itineraries">Current Itineraries</NavLink>
              </li>
            )}
            {userRole.includes("user" || "admin") && (
              <li>
                <NavLink to="/smart-itinerary">Smartinerary™</NavLink>
              </li>
            )}
            {userRole.includes("admin") && ( // Conditionally render Admin Dashboard link
              <li>
                <NavLink to="/admin-dashboard">Admin Dashboard</NavLink>
              </li>
            )}
            <li className={styles.login}>
              <NavLink to="/login">Log in</NavLink>
            </li>
            <li className={styles.signup}>
              <NavLink to="/registration">Sign up</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
