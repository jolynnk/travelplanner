import React from "react";
import Itinerary from "./components/Itinerary";
import SmartItinerary from "./components/SmartItinerary";
import Login from "./components/authentication/Login";
import Registration from "./components/authentication/Registration";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import UserItineraries from "./components/UserItineraries";

const App = () => {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Itinerary />} />
        <Route path="/user-itineraries" element={<UserItineraries />} />
        <Route path="/smart-itinerary" element={<SmartItinerary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
