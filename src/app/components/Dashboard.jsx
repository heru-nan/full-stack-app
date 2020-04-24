import React from "react";
import { connect } from "react-redux";
import { ConnectedTasklist } from "./Tasklist";

export const Dashboard = ({ groups }) => (
  <div>
    <h1>dashboard</h1>
    {groups.map((group) => (
      <ConnectedTasklist key={group.id} id={group.id} name={group.name} />
    ))}
  </div>
);

function mapStateToProps(state) {
  return {
    groups: state.groups,
  };
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
