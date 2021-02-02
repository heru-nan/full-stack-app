import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as mutations from "../store/mutations";

import {Heading, Box, Input, Button,Divider, Select, UnorderedList, ListItem} from '@chakra-ui/react'

const TaskDetails = ({
  comments,
  task,
  groups,
  changeStateTask,
  setTaskGroup,
  setTaskName,
  createComment,
  deleteTask,
}) => {
  return (
    task && (
      <main className="container">
        <Heading
        >
          Task details: 
          <br />
          <span style={{ color: "#5eba7d" }}>{task.name.length > 20? task.name.slice(0, 19) + "...": task.name}</span>
        </Heading>
        <Divider orientation="horizontal" />

        <CardDetails>
          <Heading size="l">Name && State</Heading>
          <Input size="l" m="1%" p="0.5%" borderRadius="md" value={task.name} onChange={setTaskName} />
          <Button m="1%" bg="green.200" color="teal.800" size="xs" onClick={() => changeStateTask(task.isComplete)}>
            {task.isComplete ? `Complete` : `Incomplete`}
          </Button>
        </CardDetails>

        <CardDetails>
        <Heading size="l">Group</Heading>
          <Select size="xs" onChange={setTaskGroup} value={task.group}>
            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.name}
              </option>
            ))}
          </Select>
        </CardDetails>

        <CardDetails>
          <Heading size="l">Comment</Heading>
          <form onSubmit={(e) => createComment(e, task.owner)}>
            <Input
              type="text"
              placeholder="Write your comment"
              name="comment"
              defaultValue=""
              size="xs"
              m="1%" p="0.5%"
              borderRadius="md"
            />
            <Button size="xs" m="1%" bg="green.200" color="teal.800" type="submit">Add comment</Button>
          </form>
          <UnorderedList ml="10%">
            {comments.map((e) => {
              if (e.task === task._id) {
                return (
                  <ListItem key={e._id}>
                    <p>{e.content}</p>
                  </ListItem>
                );
              }
            })}
          </UnorderedList>
       </CardDetails>

        <Box m="2%" d="flex" justifyContent="space-between">
          <Link to="/dashboard">
            <Button size="xs" m="1%" bg="green.200" color="teal.800">Done</Button>
          </Link>
          <Button size="xs" m="1%" bg="red.200" color="teal.800" onClick={deleteTask}>
            Delete
          </Button>
        </Box>
      </main>
    )
  );
};

const CardDetails = ({children}) => (
  <Box as="section"
          m="2%"
          p={5}
          shadow="md"
          borderWidth="1px"
          flex="1"
          borderRadius="md"
    >{children}</Box>
) 

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params._id;
  let task = state.tasks.find((task) => task._id === id) || null;
  let groups = state.groups || {};

  return {
    id,
    task,
    groups,
    comments: state.comments,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params._id;
  return {
    deleteTask() {
      dispatch({ type: mutations.DELETE_TASK, id });
    },
    createComment(e, owner) {
      e.preventDefault();
      let content = e.target[`comment`].value;
      dispatch(mutations.requestCommentCreation(id, owner, content));
      e.target.reset();
    },
    changeStateTask() {
      dispatch(mutations.changeStateTask(id));
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
