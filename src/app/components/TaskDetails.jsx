import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as mutations from "../store/mutations";

const TaskDetails = ({
  id,
  comments,
  task,
  groups,
  setTaskComplete,
  setTaskGroup,
  setTaskName,
  createComment,
  deleteTask,
}) => {
  console.log(task);
  return task ? (
    <main>
      <header>
        <input value={task.name} onChange={setTaskName} />
        <button onClick={() => setTaskComplete(id, task.isComplete)}>
          {task.isComplete ? `Complete` : `reOpen`}
        </button>
      </header>
      <section className="group">
        <select onChange={setTaskGroup} value={task.group}>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </section>
      <section className="comments">
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
            if (e.task === task.id) {
              return <li key={e.id}>{e.content}</li>;
            }
          })}
        </ul>
      </section>
      <Link to="/dashboard">
        <button>done</button>
      </Link>
      <button onClick={deleteTask}>delete</button>
    </main>
  ) : null;
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
    createComment(e, task) {
      e.preventDefault();
      let content = e.target[`comment`].value;
      dispatch(mutations.requestCommentCreation(id, task, content));
      e.target.reset();
    },
    setTaskComplete(id, isComplete) {
      dispatch(mutations.setTaskCompletation(id, isComplete));
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
