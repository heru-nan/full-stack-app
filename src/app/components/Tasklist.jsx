import React from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";
import { Link } from "react-router-dom";
import { Heading, Button, Stack, Box, Text } from "@chakra-ui/core";

export const Tasklist = ({ tasks, name, id, createNewTask }) => (
  <div style={{ padding: "10px" }}>
    <Heading as="h2" size="md">
      {name}
    </Heading>
    <Stack spacing={10}>
      {tasks.map((task) => (
        <Link to={`task/${task.id}`} key={task.id}>
          <Feature
            title={task.name}
            desc={task.isComplete ? "complete" : "incomplete"}
            m="2"
          />
        </Link>
      ))}
    </Stack>
    <Button onClick={() => createNewTask(id)}>new task</Button>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  let groupID = ownProps.id;
  return {
    name: ownProps.name,
    id: groupID,
    x: ownProps.x ? ownProps : "o",
    tasks: state.tasks.filter((task) => task.group === groupID),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createNewTask(id) {
      console.log(`new task created with id: ${id}`);
      dispatch(requestTaskCreation(id));
    },
  };
};

export const ConnectedTasklist = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasklist);

// style components

function Feature({ title, desc, ...rest }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
}
