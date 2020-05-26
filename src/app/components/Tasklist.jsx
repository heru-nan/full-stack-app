import React, { useState } from "react";
import { connect } from "react-redux";
import {
  requestTaskCreation,
  GROUP_NAME,
  setGroupName,
  REQUEST_DELETE_GROUP,
} from "../store/mutations";
import { Link, useHistory } from "react-router-dom";
import FormList from "./FormSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <section className="card-group">
      <header>
        <h2 className="header-title">
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
        </h2>
        <div className="header-buttons">
          <button onClick={handleClick}>
            {edit ? (
              <FontAwesomeIcon icon="check" />
            ) : (
              <FontAwesomeIcon icon="object-group" />
            )}
          </button>
          <button
            onClick={handleDelete}
            style={{ display: edit ? "inline" : "none" }}
          >
            <FontAwesomeIcon icon="trash" type />
          </button>
        </div>
      </header>
      <ul onClick={(e) => e.stopPropagation()}>
        {tasks.map((task) => (
          <li
            className="card-element"
            key={task._id}
            onClick={() => history.push(`task/${task._id}`)}
          >
            <FontAwesomeIcon
              icon="circle"
              size="xs"
              style={{ fontSize: "0.5rem", marginRight: "5px" }}
            />
            {task.name}
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
      e.target.reset();
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
