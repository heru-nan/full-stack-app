import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";

import InputPassword from './chakra/IPassword';
import InputUsername from './chakra/IUser';
import LabelSignin from './chakra/LSignin';
import {Button, Heading, Divider} from '@chakra-ui/react'

const Login = ({ authenticateUser, authenticated }) => {
  return (
    <div className="container">
      <Heading>
        Groups, Tasks & Comments
      </Heading>

      <Divider orientation="horizontal" />

      <form className="container" onSubmit={authenticateUser}>
        <InputUsername name="username" />
        <InputPassword name="password" />

        <LabelSignin />
        <Button colorScheme="teal" variant="solid" type="submit">
          Login
        </Button>
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
