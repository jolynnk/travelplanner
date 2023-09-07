import React from "react";
// import Activity from "./components/Activity";
import Itinerary from "./components/Itinerary";
import SmartItinerary from "./components/SmartItinerary";
import Login from "./components/authentication/Login";
import Registration from "./components/authentication/Registration";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ActivityContext from "./context/ActivityContext";

const App = () => {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Itinerary />} />
        <Route path="/smart-itinerary" element={<SmartItinerary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Router>
  );
};

export default App;
