import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import icons for the show/hide toggle
import React, { useState } from "react";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  //   const [authToken, setAuthToken] = useState("");

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const jwtToken = data.token; // Extract the JWT token from the response
        // Store the token in a state, context, or local storage
        // Example using state:
        // Store the JWT token in localStorage (browser storage and be retrieved when needed - note potential security issues) to be used in itinerary.jsx (can also use usecontext)
        localStorage.setItem("jwtToken", jwtToken);
        window.location.href = "/";
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <>
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
          Log in to TravelPlanner
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <br></br>
        <br></br>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          style={{ width: "300px" }} // Adjust the width as needed
          value={user}
          onChange={handleUserChange}
        />
        <br></br>
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          style={{ width: "300px" }} // Adjust the width as needed
          type={passwordVisible ? "text" : "password"} // Toggle between "text" and "password" types
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {passwordVisible ? (
                    <Visibility /> // Show "eye" icon when password is visible
                  ) : (
                    <VisibilityOff /> // Show "eye slash" icon when password is hidden
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <br></br>
        <Button onClick={handleLogin}>Log in</Button>
      </div>
    </>
  );
};

export default Login;
