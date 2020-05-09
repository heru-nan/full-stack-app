import React, { useState } from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";
import { Link } from "react-router-dom";

export const Tasklist = ({ tasks, name, id, createNewTask, owner }) => {
  const [showinput, setShowinput] = useState(false);

  return (
    <section>
      <h2>{name}</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <Link to={`task/${task._id}`}>{task.name}</Link>
          </li>
        ))}
        <li style={{ display: showinput && "none" }}>
          <button
            onClick={() => {
              setShowinput(true);
            }}
          >
            new task
          </button>
        </li>
        <li style={{ display: !showinput && "none" }}>
          <form
            onSubmit={(e) => {
              createNewTask(e, id, owner);
              setShowinput(false);
            }}
          >
            <input type="text" placeholder="task" name="task" defaultValue="" />
            <button type="submit">add task</button>
          </form>
        </li>
      </ul>
    </section>
  );
};

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
    createNewTask(e, id, owner) {
      e.preventDefault();
      console.log(`new task created with id: ${id}`);
      const name = e.target["task"].value;
      dispatch(requestTaskCreation(id, owner, name));
    },
  };
};

export const ConnectedTasklist = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasklist);
