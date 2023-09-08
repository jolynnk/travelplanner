import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Create Itinerary</NavLink>
          </li>
          <li>
            <NavLink to="/smart-itinerary">Smart Itinerary</NavLink>
          </li>
          <li>
            <NavLink to="/login">Log in</NavLink>
          </li>
          <li>
            <NavLink to="/registration">Sign up</NavLink>
          </li>
          <li>
            <NavLink to="/admin-dashboard">Admin Dashboard</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
