import React from "react";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  formLockup: {
    
  },
  form: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',

  },
  inputLockup: {
    display: 'inline-block'
  },
  textfield: {
    marginTop: '2em',
    paddingLeft: '1em',
    background: 'none',
    border: 'none',
    borderBottom: '1px solid black'
  },
  button: {
    margin: theme.spacing(1),
  }
}));


const LoginForm = () => {
  const classes = useStyles();
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
      // Basic post request with fetch (Ideally have a generic fetch function in a separate file)
      let jsonResponse = await fetch("/api/v1/login", {
        method: 'post',
        body: JSON.stringify(userDetails)
      });
      
      // Parse the json response from json into an JS object
      let result = await jsonResponse.json();
      if (result) {
        setUserDetails({
          ...userDetails,
          isAuthenticated: true
        });
      }
    } catch(err) {
      // Alert on errors when we attempt to login
      alert("An error occurred when authenticating");
    }
  }

  return (
    <div className={classes.formLockup}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <h2 variant="h2">Login Form</h2>
        <div className={classes.inputLockup}>
          <label htmlFor="username">Username</label>
          <input
            ref={usernameInputRef}
            type="text" 
            id="username" 
            className={classes.textfield} 
            value={userDetails.username} 
            onChange={handleChange("username")} 
            />
        </div>
        <div className={classes.inputLockup}>
          <label htmlFor="password">Password</label>
          <input 
            ref={passwordInputRef}
            id="password"
            label="Password"
            className={classes.textfield}
            value={userDetails.password}
            onChange={handleChange("password")}
            />
        </div>
        <button className={classes.button} type="submit">
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