import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";
import { Link } from "react-router-dom";
import FormList from "./FormSection";

export const Tasklist = ({ tasks, name, handleTaskSubmit }) => {
  return (
    <section>
      <h2>{name}</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <Link to={`task/${task._id}`}>{task.name}</Link>
          </li>
        ))}
        <FormList submit={handleTaskSubmit} />
      </ul>
    </section>
  );
};

const mapStateToProps = (state, ownProps) => {
  let groupID = ownProps.id;
  return {
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
      dispatch(requestTaskCreation(id, owner, name));
    },
  };
};

export const ConnectedTasklist = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasklist);
