import React, { useState } from "react";
import { connect } from "react-redux";
import {
  requestTaskCreation,
  GROUP_NAME,
  setGroupName,
  REQUEST_DELETE_GROUP,
} from "../store/mutations";
import { Link, useHistory } from "react-router-dom";

import AddTask from "./FormSection";

import { Divider } from '@chakra-ui/react';
import { Box, Text, Heading, List, ListItem } from "@chakra-ui/react"

export const Tasklist = ({
  tasks,
  name,
  handleTaskSubmit,
  handleNameChange,
  handleNameSubmit,
  handleDelete,
}) => {
  const history = useHistory();
  const [edit, setEdit] = useState(false);
  const handleClick = (e) => {
    if (edit) handleNameSubmit();
    setEdit(!edit);
  };
  return (
    <Box as="section"
          m="2%"
          p={5}
          shadow="md"
          borderWidth="1px"
          flex="1"
          borderRadius="md"
    >
        <Heading size="l">
          {
            name
          }
        </Heading>
      <List className="container" m={0} mt="1%" mb="1%" onClick={(e) => e.stopPropagation()}>
        {tasks.map((task) => (
          <ListItem
            key={task._id}
            textAlign="left"
            as="button"
            shadow="xs"
            borderWidth="1px"
            flex="1"
            borderRadius="md"
            p="1%"
            onClick={() => history.push(`task/${task._id}`)}
            mt="0.5%"
            mb="0.5%"
          >
            <Text>
            {task.name.length > 50? task.name.slice(0, 50) + "...": task.name}
            </Text>
          </ListItem>
        ))}

      </List>

      <AddTask submit={handleTaskSubmit} />

    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  let groupID = ownProps.id;
  return {
    groupID,
    name: ownProps.name,
    owner: ownProps.owner,
    tasks: state.tasks.filter((task) => task.group === groupID),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let { id, owner } = ownProps;
  return {
    handleTaskSubmit(e) {
      e.preventDefault();
      const name = e.target["task"].value;
      const formatTask = name[0].toUpperCase() + name.slice(1);
      e.target.reset();
      if (name.trim()) {
        dispatch(requestTaskCreation(id, owner, formatTask));
      }
    },
    handleNameChange(e) {
      dispatch({ type: GROUP_NAME, id, name: e.target.value });
    },
    handleNameSubmit() {
      dispatch(setGroupName(id));
    },
    handleDelete() {
      dispatch({ type: REQUEST_DELETE_GROUP, id });
    },
  };
};

export const ConnectedTasklist = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasklist);
