import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
// chakra imports
import { Input, Box, Heading, FormControl, Button } from "@chakra-ui/core";

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
      <Heading>LOGIN</Heading>
      <form onSubmit={authenticateUser} style={{ maxWidth: "50%" }}>
        <Input
          mt={2}
          mb={2}
          type="text"
          placeholder="username"
          name="username"
          defaultValue="Dev"
        />
        <Input
          mt={2}
          mb={2}
          type="password"
          placeholder="password"
          name="password"
          defaultValue=""
        />
        {authenticated === mutations.NOT_AUTHENTICATED ? (
          <p>login incorrect</p>
        ) : null}
        <Button type="submit">Login</Button>
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
