import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
import { Link } from "react-router-dom";
import TextField from "./atomic/TextField";

const Login = ({ authenticateUser, authenticated }) => {
  return (
    <div className="container">
      <h2>
        Groups Tasks & Comments <small>Login</small>
      </h2>

      <form onSubmit={authenticateUser}>
        <TextField type="text" name="username" label="user" />
        <TextField type="password" name="password" label="password" />
        <span>
          Don't have an account? <Link to="/signin">Sign in</Link>
        </span>
        <button type="submit">Login</button>
      </form>

      {authenticated === mutations.NOT_AUTHENTICATED ? (
        <p>login incorrect</p>
      ) : null}
    </div>
  );
};
const mapStateToProps = ({ session }) => ({
  authenticated: session.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser(e) {
    e.preventDefault();
    let username = e.target[`username`].value;
    let password = e.target[`password`].value;
    dispatch(mutations.requestAuthenticateUser(username, password));
  },
});

export const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
