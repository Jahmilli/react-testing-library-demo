import React from "react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./LoginForm.css";
import { login } from "../../logic/functions/login";

const loginFormStyle = makeStyles(theme => ({
  button: {
    marginTop: "1em"
  }
}));

const LoginForm = () => {
  const classes = loginFormStyle();
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
      const loginResult = await login(
        userDetails.username.text,
        userDetails.password.text
      );
      if (loginResult) {
        setUserDetails({
          ...userDetails,
          isAuthenticated: true
        });
        setMessage("Successfully logged in");
      } else {
        throw new Error();
      }
    } catch (err) {
      // Alert on errors when we attempt to login
      setMessage("The username and/or password is incorrect");
    }
  };

  return (
    <div className="formLockup">
      <form className="form" onSubmit={handleSubmit} data-testid="login-form">
        <h2 variant="h2">Welcome Back</h2>
        <TextField
          error={userDetails.username.error}
          fullWidth
          id="username"
          label="Username"
          autoFocus
          inputRef={usernameInputRef}
          helperText={
            userDetails.username.error ? "Please fill in your username" : " "
          }
          value={userDetails.username.text}
          onChange={handleChange("username")}
        />
        <TextField
          error={userDetails.password.error}
          fullWidth
          id="password"
          label="Password"
          type="password"
          inputRef={passwordInputRef}
          helperText={
            userDetails.password.error ? "Please fill in your password" : " "
          }
          value={userDetails.password.text}
          onChange={handleChange("password")}
        />
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Login
        </Button>
      </form>
      <p variant="body1">{message}</p>
    </div>
  );
};

export default LoginForm;
