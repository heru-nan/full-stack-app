import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
import { Link } from "react-router-dom";

const Login = ({ authenticateUser, authenticated }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>LOGIN</h2>
      <form
        onSubmit={authenticateUser}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <input
          type="text"
          placeholder="username"
          name="username"
          defaultValue="Dev"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          defaultValue=""
        />
        {authenticated === mutations.NOT_AUTHENTICATED ? (
          <p>login incorrect</p>
        ) : null}
        Don't have an account? <Link to="/signin">Sign in</Link>
        <button style={{ display: "block" }} type="submit">
          Login
        </button>
        <span></span>
      </form>
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
