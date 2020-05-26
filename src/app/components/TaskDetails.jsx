import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as mutations from "../store/mutations";

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
        <h2
          style={{
            maxWidth: "90%",
            wordWrap: "break-word",
            textAlign: "center",
          }}
        >
          task details
          <br />
          <span style={{ color: "#5eba7d" }}>{task.name}</span>
        </h2>
        <section className="card-details">
          <h2>change name and state</h2>
          <input value={task.name} onChange={setTaskName} />
          <button onClick={() => changeStateTask(task.isComplete)}>
            {task.isComplete ? `Complete` : `Incomplete`}
          </button>
        </section>
        <section className="card-details">
          <h2>change group</h2>
          <select onChange={setTaskGroup} value={task.group}>
            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.name}
              </option>
            ))}
          </select>
        </section>
        <section className="card-details">
          <h2>comments</h2>
          <form onSubmit={(e) => createComment(e, task.owner)}>
            <input
              type="text"
              placeholder="comment"
              name="comment"
              defaultValue=""
            />
            <button type="submit">add comment</button>
          </form>
          <ul>
            {comments.map((e) => {
              if (e.task === task._id) {
                return (
                  <li key={e._id}>
                    <p>{e.content}</p>
                  </li>
                );
              }
            })}
          </ul>
        </section>
        <div>
          <Link to="/dashboard">
            <button className="normal-button">done</button>
          </Link>
          <button className="normal-button" onClick={deleteTask}>
            delete
          </button>
        </div>
      </main>
    )
  );
};

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
