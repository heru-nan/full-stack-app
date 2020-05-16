import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";

const Signin = ({ requestSignin, ocuppied }) => (
  <main className="container">
    <h1>Signin</h1>
    <section>
      <form
        onSubmit={requestSignin}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          name="username"
          defaultValue=""
          placeholder="username"
        />
        {ocuppied ? <p>username ocuppied</p> : null}
        <input
          type="password"
          name="password"
          defaultValue=""
          placeholder="password"
        />
        <input
          type="password"
          name="passwordLogin2"
          defaultValue=""
          placeholder="repeat password"
        />
        <button type="submit">signin</button>
      </form>
    </section>
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
