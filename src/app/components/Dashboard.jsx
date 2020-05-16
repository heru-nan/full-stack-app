import React from "react";
import { connect } from "react-redux";
import { ConnectedTasklist } from "./Tasklist";
import { ConnectedUsername } from "./Username";
import * as mutations from "../store/mutations";

export const Dashboard = ({ groups, id, addNewGroup }) => (
  <main className="container">
    <h1 style={{ display: "inline" }}>
      Dashboard by <ConnectedUsername id={id} />
    </h1>
    {groups.map((group) => (
      <ConnectedTasklist
        key={group._id}
        id={group._id}
        name={group.name}
        owner={group.owner}
      />
    ))}
    <button onClick={addNewGroup}>+</button>
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
    addNewGroup() {
      dispatch({
        type: mutations.REQUEST_GROUP_CREATION,
      });
    },
  };
}

export const ConnectedDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
