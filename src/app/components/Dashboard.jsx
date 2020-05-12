import React from "react";
import { connect } from "react-redux";
import { ConnectedTasklist } from "./Tasklist";
import { ConnectedUsername } from "./Username";
import * as mutations from "../store/mutations";

export const Dashboard = ({ groups, id, logout }) => (
  <main className="container">
    <h1 style={{ display: "inline" }}>
      Dashboard by <ConnectedUsername id={id} />
    </h1>
    {/* <button onClick={logout} style={{ display: "inline" }}>
      log out
    </button> */}
    {groups.map((group) => (
      <ConnectedTasklist
        key={group.id}
        id={group.id}
        name={group.name}
        owner={group.owner}
      />
    ))}
  </main>
);

function mapStateToProps(state) {
  return {
    groups: state.groups,
    id: state.session.id,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    logout() {
      dispatch(mutations.requestLogut());
    },
  };
}

export const ConnectedDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
