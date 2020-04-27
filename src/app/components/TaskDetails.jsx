import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as mutations from "../store/mutations";

const TaskDetails = ({
  id,
  comments,
  task,
  isComplete,
  groups,
  setTaskComplete,
  setTaskGroup,
  setTaskName,
  createComment,
}) => (
  <div>
    <div>
      <input value={task.name} onChange={setTaskName} />
    </div>
    <div>
      <button onClick={() => setTaskComplete(id, isComplete)}>
        {isComplete ? `Complete` : `reOpen`}
      </button>
    </div>
    <div>
      <select onChange={setTaskGroup} value={task.group}>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
    </div>
    <form onSubmit={(e) => createComment(e, task.owner)}>
      <input type="text" placeholder="comment" name="comment" defaultValue="" />
      <button type="submit">add comment</button>
    </form>
    <div>
      {comments.map((e) => {
        if (e.task === task.id) {
          return <div key={e.id}>{e.content}</div>;
        }
      })}
    </div>
    <Link to="/dashboard">
      <button>done</button>
    </Link>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let task = state.tasks.find((task) => task.id === id);
  let groups = state.groups;
  return {
    id,
    task,
    groups,
    isComplete: task.isComplete,
    comments: state.comments,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id;
  return {
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
