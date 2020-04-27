import React from "react";
import { connect } from "react-redux";

const Username = ({ name }) => {
  return <span style={{ color: "#5eba7d" }}>{name}</span>;
};

const mapStateToProps = (state, ownProps) => {
  return state.session.id === ownProps.id
    ? state.session
    : { name: "Error: Not user in session" };
};

export const ConnectedUsername = connect(mapStateToProps)(Username);
