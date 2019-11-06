import React from "react";
import "./LoginForm.css"

const LoginForm = () => {
  const usernameInputRef = React.createRef();
  const passwordInputRef = React.createRef();

  const [userDetails, setUserDetails] = React.useState({
    username: "",
    password: "",
    isAuthenticated: false
  });

  const handleChange = (name) => (event) => {
    setUserDetails({
      ...userDetails,
      [name]: event.target.value
    });
  }

  const checkEmptyFields = () => {
    if (userDetails.username.length === 0 && usernameInputRef) {
      usernameInputRef.current.focus();
      return false;
    }
    if (userDetails.password.length === 0 && passwordInputRef) {
      passwordInputRef.current.focus();
      return false;
    }
    return true;
  }

  const handleSubmit = async (event) => {
    // Prevent page from reloading on submit
    event.preventDefault();
    if (!checkEmptyFields()) {
      return;
    }

    try {
      if (userDetails.username === "username123" && 
        userDetails.password === "secure123") {
        setUserDetails({
          ...userDetails,
          isAuthenticated: true
        });
      } else {
        throw new Error("Invalid response during authentication");
      }
    } catch(err) {
      // Alert on errors when we attempt to login
      alert("An error occurred when authenticating");
    }
  }

  return (
    <div className="formLockup">
      <form className="form" onSubmit={handleSubmit}>
        <h2 variant="h2">Hey! Sign in here</h2>
        <div className="inputLockup">
          <label htmlFor="username">Username</label>
          <input
            ref={usernameInputRef}
            type="text" 
            id="username" 
            className="textField" 
            value={userDetails.username} 
            onChange={handleChange("username")} 
            />
        </div>
        <div className="inputLockup">
          <label htmlFor="password">Password</label>
          <input 
            ref={passwordInputRef}
            id="password"
            label="Password"
            className="textField"
            value={userDetails.password}
            onChange={handleChange("password")}
            />
        </div>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
      <p variant="body1">
        {
          userDetails.isAuthenticated ?
          "Successfully logged in"
          : "User has not logged in"
        }
      </p>
    </div>
  );
}

export default LoginForm;