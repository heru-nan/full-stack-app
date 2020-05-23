import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
import TextField from "./atomic/TextField";

const Signin = ({ requestSignin, ocuppied }) => (
  <main className="container">
    <h1>Signin</h1>
    <form
      onSubmit={requestSignin}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextField type="text" name="username" label="user" />
      {ocuppied ? <p>username ocuppied</p> : null}
      <TextField type="password" name="password" label="password" />
      <TextField
        type="password"
        name="passwordLogin2"
        label="password repeat"
      />
      <button type="submit">signin</button>
    </form>
  </main>
);

const mapStateToProps = (state, ownProps) => ({
  ocuppied: state.session.error.length > 0 ? true : false,
});

const mapDispatchToProps = (dispatch) => ({
  requestSignin(e) {
    e.preventDefault();
    const username = e.target["username"].value;
    const password = e.target["password"].value;
    if (username.length > 1 && password.length > 2) {
      return dispatch(mutations.requestCreateUser(username, password));
    }
    return alert("CAMPO INCORRECTO");
  },
});

export const ConnectedSignin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);
