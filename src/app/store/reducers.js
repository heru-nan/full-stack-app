import {combineReducers} from 'redux';
import * as mutations from './mutations';


function session(userSession= {
    user: null, error: [], 
}, action){
    let {type, authenticated} = action;
    switch(type){
        case mutations.SET_STATE:
            return {...userSession, id: action.state.session.id, name: action.state.session.name}
        case mutations.REQUEST_AUTHENTICATED_USER:
            return {...userSession, authenticated: mutations.AUTHENTICATED}
        case mutations.PROCESSING_AUTHENTICATED_USER:
            return {...userSession, authenticated}
        case mutations.LOGOUT:
            return {error: []};
        case mutations.REQUEST_CREATED_USER:
            return {...userSession, user: mutations.CREATING_USER}
        case mutations.PROCESSING_CREATED_USER:
            return {...userSession, user: action.user, error: action.error}
        default:
            return userSession;
    }
};

function tasks(tasks = [], action){
    switch(action.type){
        case mutations.LOGOUT:
            return action.clean;
        case mutations.SET_STATE:
            return action.state.tasks;
        case mutations.CREATE_TASK:
            return [
                ...tasks, {
                    _id: action.taskID,
                    name: action.name,
                    group: action.groupID,
                    owner: action.ownerID,
                    isComplete: false,
                }
            ]
        case mutations.SET_TASK_STATE:
            return tasks.map(task => {
                return task._id === action.taskID ? {...task, isComplete: !task.isComplete} : task})
        case mutations.SET_TASK_GROUP:
            return tasks.map(task => {
                return task._id === action.taskID ? {...task, group: action.groupID}: task
            })
        case mutations.SET_TASK_NAME:
            return tasks.map(task => {
                return task._id === action.taskID ? {...task, name: action.name} : task;
            })
        case mutations.DELETE_TASK_SUCCESS:
            const filterTask=  tasks.filter(task =>{
                return task._id.toString() !== action.id.toString();
            })
            return filterTask;
        
    }
    return tasks;
}

function comments(comments = [], action){
    switch(action.type){
        case mutations.LOGOUT:
            return action.clean;
        case mutations.SET_STATE:
            return action.state.comments;
        case mutations.CREATE_COMMENT:
            return [...comments, {
                owner: action.ownerID, _id: action.commentID, task: action.taskID, content: action.content
            }]
    }
    return comments;
};
function users(users = [], action){
    return users;
};

function groups(groups = [], action){
    if(action.type === mutations.SET_STATE){
        if(action.state.groups.length > 0){
        return action.state.groups;
        }
        return [{
            name:"To Do",
            id:"G1",
            owner:action.state.session.id
        },{
            name:"Doing",
            id:"G2",
            owner:action.state.session.id
        },{
            name:"Done",
            id:"G3",
            owner:action.state.session.id
        }]
    }
    if(action.type === mutations.LOGOUT){
        return action.clean;
    }
    return groups;
}

const appReducers = combineReducers({
    session,
    tasks,
    comments,
    groups,
    users
})

export default appReducers;