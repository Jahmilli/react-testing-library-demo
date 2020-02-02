import React from "react";
import { Button, TextField } from "@material-ui/core";
// import { Link } from "react-router-dom";
import "./LoginForm.css";
import { login } from "../../logic/functions/login";

const LoginForm = () => {
  const usernameInputRef = React.createRef();
  const passwordInputRef = React.createRef();
  const [userDetails, setUserDetails] = React.useState({
    username: {
      error: false,
      text: ""
    },
    password: {
      error: false,
      text: ""
    },
    isAuthenticated: false
  });
  const [message, setMessage] = React.useState("");

  const handleChange = name => event => {
    setUserDetails({
      ...userDetails,
      [name]: {
        error: false,
        text: event.target.value
      }
    });
  };

  const setFieldError = field => {
    setUserDetails({
      ...userDetails,
      [field]: {
        text: userDetails[field].text,
        error: true
      }
    });
  };

  const checkEmptyFields = () => {
    if (userDetails.username.text.length === 0) {
      usernameInputRef.current.focus();
      setFieldError("username");
      return false;
    }
    if (userDetails.password.text.length === 0) {
      passwordInputRef.current.focus();
      setFieldError("password");
      return false;
    }
    return true;
  };

  const handleSubmit = async event => {
    // Prevent page from reloading on submit
    event.preventDefault();
    if (!checkEmptyFields()) {
      return;
    }

    try {
      if (login(userDetails.username.text, userDetails.password.text)) {
        setUserDetails({
          ...userDetails,
          isAuthenticated: true
        });
        setMessage("Successfully logged in");
      } else {
        throw new Error("Invalid response during authentication");
      }
    } catch (err) {
      // Alert on errors when we attempt to login
      // alert("An error occurred when authenticating");
      setMessage("The username and/or password is incorrect");
    }
  };

  return (
    <div className="formLockup">
      <form className="form" onSubmit={handleSubmit} data-testid="login-form">
        <h2 variant="h2">Sign in</h2>
        <div className="inputLockup">
          <TextField
            error={userDetails.username.error}
            id="username"
            label="Username"
            autoFocus
            inputRef={usernameInputRef}
            helperText={
              userDetails.username.error ? "Please fill in a username" : ""
            }
            value={userDetails.username.text}
            onChange={handleChange("username")}
          />
        </div>
        <div className="inputLockup">
          <TextField
            error={userDetails.password.error}
            id="password"
            label="Password"
            type="password"
            inputRef={passwordInputRef}
            helperText={
              userDetails.password.error ? "Please fill in a password" : ""
            }
            value={userDetails.password.text}
            onChange={handleChange("password")}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
      <p variant="body1">{message}</p>
      {/* <Link to="/register">Register here</Link> */}
    </div>
  );
};

export default LoginForm;
