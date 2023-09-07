import { TextField, Button, Typography } from "@mui/material";
import React, { useState } from "react";

const Registration = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegistration = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user, password }),
        }
      );

      if (response.ok) {
        window.location.href = "/login";
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        style={{ fontSize: "24px", margin: "60px 0px 10px 0px" }}
      >
        Register for TravelPlanner
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <br></br>
      <br></br>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        style={{ width: "300px" }}
        value={user}
        onChange={handleUserChange}
      />
      <br></br>
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        style={{ width: "300px" }}
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <br></br>
      <Button onClick={handleRegistration}>Register</Button>
    </div>
  );
};

export default Registration;
