import React from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";
import { Link } from "react-router-dom";

export const Tasklist = ({ tasks, name, id, createNewTask, owner }) => (
  <section>
    <h2>{name}</h2>
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Link to={`task/${task.id}`}>{task.name}</Link>
        </li>
      ))}
      <li>
        <button onClick={() => createNewTask(id, owner)}>new task</button>
      </li>
    </ul>
  </section>
);

const mapStateToProps = (state, ownProps) => {
  let groupID = ownProps.id;
  return {
    name: ownProps.name,
    owner: ownProps.owner,
    id: groupID,
    tasks: state.tasks.filter((task) => task.group === groupID),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createNewTask(id, owner) {
      console.log(`new task created with id: ${id}`);
      dispatch(requestTaskCreation(id, owner));
    },
  };
};

export const ConnectedTasklist = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasklist);
