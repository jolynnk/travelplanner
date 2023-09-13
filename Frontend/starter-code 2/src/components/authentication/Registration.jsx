import { TextField, Button, Typography } from "@mui/material";
import React, { useState } from "react";

const Registration = () => {
  const [user, setUser] = useState(""); //stores inputted username
  const [password, setPassword] = useState(""); //stores inputted password
  const [error, setError] = useState(""); //stores error at invalid login

  const handleUserChange = (e) => { //update state with user input
    setUser(e.target.value);
  };

  const handlePasswordChange = (e) => { //update state with user input
    setPassword(e.target.value);
  };

  //user registration function
  const handleRegistration = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", //set content type to json
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
        style={{ fontSize: "24px", margin: "60px 0px 10px 0px", color: "#4f6369", fontWeight: "bold" }}
      >
        Register
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
