import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
import TextField from "./chakra/TextField";
import Modal from "react-modal";
import { Link, useHistory } from "react-router-dom";

import InputPassword from './chakra/IPassword';
import InputUsername from './chakra/IUser';
import LabelSignin from './chakra/LSignin';
import {Button, Heading, Divider} from '@chakra-ui/react'
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
      <Heading>Sign Up</Heading>
      <Divider orientation="horizontal" />

      <form
        onSubmit={requestSignin}
        className="container"
      >
        <InputUsername name="username" />
        <InputPassword label="Password" name="password" />
        <InputPassword label="Repeat password" name="password2" />

        <Button colorScheme="teal" variant="solid" type="submit">
          Signin
        </Button>

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
    console.log(e.target);
    console.log(e.target["password"]);

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
