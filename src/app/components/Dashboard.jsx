import React from "react";
import { connect } from "react-redux";
import { ConnectedTasklist } from "./Tasklist";
import { ConnectedUsername } from "./Username";

export const Dashboard = ({ groups, id }) => (
  <div>
    <h1>
      Dashboard by <ConnectedUsername id={"U1"} />
    </h1>
    {groups.map((group) => (
      <ConnectedTasklist
        key={group.id}
        id={group.id}
        name={group.name}
        owner={group.owner}
      />
    ))}
  </div>
);

function mapStateToProps(state) {
  return {
    groups: state.groups,
    id: state.session.id,
  };
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
