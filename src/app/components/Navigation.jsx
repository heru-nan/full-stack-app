import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import * as mutatitions from "../store/mutations";

const Navigation = ({ exitUser }) => (
  <nav>
    <ul>
      <li
        style={{
          marginRight: "10px",
          borderRight: "1px solid black",
          borderLeft: "1px solid black",
        }}
      >
        <Link style={{ textDecoration: "none" }} to="/dashboard">
          Home
        </Link>
      </li>
      <li
        style={{
          marginLeft: "10px",
          borderLeft: "1px solid black",
          borderRight: "1px solid black",
        }}
      >
        <Link
          style={{ textDecoration: "none", height: "inherit" }}
          to="/"
          onClick={exitUser}
        >
          Exit
        </Link>
      </li>
    </ul>
  </nav>
);

const mapDispatchToProps = (dispatch) => ({
  exitUser() {
    dispatch({ type: mutatitions.LOGOUT });
  },
});

export const ConnectedNavigation = connect(
  (state) => state,
  mapDispatchToProps
)(Navigation);
