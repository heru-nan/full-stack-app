import React from "react";
import { connect } from "react-redux";
import { ConnectedTasklist } from "./Tasklist";
import { Heading } from "@chakra-ui/core";

export const Dashboard = ({ groups }) => (
  <div>
    <Heading as="h1">Dashboard</Heading>
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
