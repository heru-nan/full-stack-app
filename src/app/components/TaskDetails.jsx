import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as mutations from "../store/mutations";
import { Input, Button, Box, Stack } from "@chakra-ui/core";

const TaskDetails = ({
  id,
  comments,
  task,
  isComplete,
  groups,
  setTaskComplete,
  setTaskGroup,
  setTaskName,
}) => (
  <Stack spacing={2} m="5">
    <Box>
      <Input value={task.name} onChange={setTaskName} />
    </Box>
    <Box>
      <Button onClick={() => setTaskComplete(id, isComplete)}>
        {isComplete ? `Complete` : `reOpen`}
      </Button>
    </Box>
    <Box>
      <select onChange={setTaskGroup} value={task.group}>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
    </Box>
    <Link to="/dashboard">
      <Button>done</Button>
    </Link>
  </Stack>
);

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let task = state.tasks.find((task) => task.id === id);
  let groups = state.groups;
  return {
    id,
    task,
    groups,
    isComplete: task.isComplete,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    setTaskComplete(id, isComplete) {
      dispatch(mutations.setTaskCompletation(id, isComplete));
    },
    setTaskGroup(e) {
      dispatch(mutations.setTaskGroup(id, e.target.value));
    },
    setTaskName(e) {
      dispatch(mutations.setTaskName(id, e.target.value));
    },
  };
};

export const ConnectedTaskDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetails);
