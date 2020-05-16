import React, { useState } from "react";
import { connect } from "react-redux";
import {
  requestTaskCreation,
  GROUP_NAME,
  setGroupName,
  REQUEST_DELETE_GROUP,
} from "../store/mutations";
import { Link } from "react-router-dom";
import FormList from "./FormSection";

export const Tasklist = ({
  tasks,
  name,
  handleTaskSubmit,
  handleNameChange,
  handleNameSubmit,
  handleDelete,
}) => {
  const [edit, setEdit] = useState(false);
  const handleClick = (e) => {
    if (edit) handleNameSubmit();
    setEdit(!edit);
  };
  return (
    <section className="card-group">
      <h2>
        {edit ? (
          <span>
            <input
              type="text"
              defaultValue={name}
              onChange={handleNameChange}
              onKeyUp={(e) => {
                if (e.keyCode === 13) {
                  handleClick();
                }
              }}
            />
          </span>
        ) : (
          name
        )}
        <button onClick={handleClick}>{edit ? "ok" : "edit"}</button>
        <button
          onClick={handleDelete}
          style={{ visibility: edit ? "visible" : "hidden", display: "inline" }}
        >
          x
        </button>
      </h2>

      <ul onClick={(e) => e.stopPropagation()}>
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
      dispatch(requestTaskCreation(id, owner, name));
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
