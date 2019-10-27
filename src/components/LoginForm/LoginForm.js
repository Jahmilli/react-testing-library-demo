import React from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  formLockup: {
    
  },
  form: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
  },
  textfield: {
    display: 'inline-block',
  },
  button: {
    margin: theme.spacing(1),
  }
}));


const LoginForm = () => {
  const classes = useStyles();

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

  const handleSubmit = async (event) => {
    // Prevent page from reloading on submit
    event.preventDefault();
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
        <Typography variant="h2">Login</Typography>
        <TextField
          id="username"
          label="Name"
          className={classes.textfield}
          value={userDetails.username}
          onChange={handleChange("username")}
          margin="normal"
        />

        <TextField
          id="password"
          label="Password"
          className={classes.textfield}
          value={userDetails.password}
          onChange={handleChange("password")}
          margin="normal"
        />
        <Button className={classes.button} type="submit">
          Login
        </Button>
      </form>
      <Typography variant="body1">
        {
          userDetails.isAuthenticated ?
          "Successfully logged in"
          : "User has not logged in"
        }
      </Typography>
    </div>
  );
}

export default LoginForm;