import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
import TextField from "./atomic/TextField";
import Modal from "react-modal";
import { Link, useHistory } from "react-router-dom";
//

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Signin = ({ requestSignin, ocuppied, openModal, username }) => {
  const history = useHistory();
  return (
    <main className="container">
      <Modal
        isOpen={openModal}
        lavel="user create modal"
        ariaHideApp={false}
        style={customStyles}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h3>User created successfully</h3>
          <p>
            Username: <span style={{ color: "lightgreen" }}>{username}</span>.
            <br />
            <br />
            <br />
            Now, login to continue.
          </p>
          <button className="normal-button" onClick={() => history.push("/")}>
            Login
          </button>
        </div>
      </Modal>
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
        <button className="normal-button" type="submit">
          signin
        </button>
      </form>
      <div id="mymodal"></div>
    </main>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ocuppied: state.session.error.length > 0 ? true : false,
  openModal: state.session.openModal,
  username: state.session.username || "error",
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
