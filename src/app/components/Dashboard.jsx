import React from "react";
import { connect } from "react-redux";
import { ConnectedTasklist } from "./Tasklist";
import { ConnectedUsername } from "./Username";
import * as mutations from "../store/mutations";
import { Heading, Divider, Button } from "@chakra-ui/react";

export const Dashboard = ({ groups, id, addNewGroup }) => (
  <main className="container">
    <Heading style={{ display: "inline" }}>
      Organizer by <ConnectedUsername id={id} />
    </Heading>
    <Divider orientation="horizontal" />

    <div className="container">
    {groups.map((group) => (
      <ConnectedTasklist
        key={group._id}
        id={group._id}
        name={group.name}
        owner={group.owner}
      />
    ))}
    <Button m="2%" onClick={addNewGroup}>
      +
    </Button>
    </div>
  </main>
);

function mapStateToProps(state) {
  return {
    groups: state.groups,
    id: state.session.id,
  };
}
function mapDispatchToProps(dispatch) {
  //dispatch(mutations.requestAuthenticateUser("Invitado", "Invitado")); //dev

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
