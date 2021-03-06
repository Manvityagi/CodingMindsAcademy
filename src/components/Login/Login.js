import React, { Component } from "react";
import classes from "./Login.module.css";
import Button from "@material-ui/core/Button";

export class Login extends Component {
  render() {
    return (
      <div className={classes.Login}>
        <img
          className={classes.himageee}
          src={require("../assets/finalLogo.jpeg")}
          alt="CodeChef"
        />
        <Button href="https://codingacademyminds.000webhostapp.com/" className={classes.loginButton} variant="contained" color="primary">
          Sign In with CodeChef
        </Button>
      </div>
    );
  }
}

export default Login;
