import React from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";
import { Link } from "react-router-dom";

export const Tasklist = ({ tasks, name, id, createNewTask }) => (
  <div>
    <h2>{name}</h2>
    <div>
      {tasks.map((task) => (
        <Link to={`task/${task.id}`} key={task.id}>
          <div>{task.name}</div>
        </Link>
      ))}
    </div>
    <button onClick={() => createNewTask(id)}>new task</button>
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
