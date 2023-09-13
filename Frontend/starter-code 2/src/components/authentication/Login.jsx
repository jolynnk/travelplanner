import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import jwtDecode from "jwt-decode";

const Login = () => {
  const [user, setUser] = useState(""); //stores inputted username
  const [password, setPassword] = useState(""); //stores inputted password
  const [error, setError] = useState(""); //stores error at invalid login
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleUserChange = (e) => { //update state with user input
    setUser(e.target.value);
  };

  const handlePasswordChange = (e) => { //update state with user input
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => { //toggles between true and false on passwordVisible state
    setPasswordVisible(!passwordVisible);
  };

  //user login function
  const handleLogin = async (e) => {
    e.preventDefault(); //prevent default form submission behavior

    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/auth/login",
        {
          method: "POST", //POST sends user credentials to server
          headers: {
            "Content-Type": "application/json", //set content type to json
          },
          body: JSON.stringify({ user, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const jwtToken = data.token; //extract JWT token from response
        const decoded = jwtDecode(jwtToken); //decode JWT token to access its payload

        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("userRole", JSON.stringify(decoded.role)); //store the user role in localStorage (brower storage, to be retrieved when needed)

        window.location.href = "/"; //direct user to main page
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
          style={{ fontSize: "24px", margin: "60px 0px 10px 0px", color: "#4f6369", fontWeight: "bold"}}
        >
          Log in
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
          type={passwordVisible ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {passwordVisible ? (
                    <Visibility /> //show "eye" icon when password visible
                  ) : (
                    <VisibilityOff /> //show "eye slash" icon when password hidden
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <br></br>
        <Button onClick={(e) => handleLogin(e)}>Log in</Button>
      </div>
    </>
  );
};

export default Login;
