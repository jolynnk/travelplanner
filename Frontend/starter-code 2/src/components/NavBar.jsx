import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Activity</NavLink>
          </li>
          <li>
            <NavLink to="/itinerary">My Trip</NavLink>
          </li>
          <li>
            <NavLink to="/smart-itinerary">Smart Itinerary</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
