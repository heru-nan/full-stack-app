import {createStore, applyMiddleware, combineReducers} from 'redux';
import { defaultState } from '../../server/defaultState';
import { createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
// import * as sagas from './sagas.mock'
import * as sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
import * as mutations from './mutations';

export const store = createStore(
    combineReducers({
        session(userSession = defaultState.session || {}, action){
            let {type, authenticated, session} = action;
            switch(type){
                case mutations.SET_STATE:
                    return {...userSession, id: action.state.session.id, name: action.state.session.name}
                case mutations.REQUEST_AUTHENTICATED_USER:
                    return {...userSession, authenticated: mutations.AUTHENTICATED}
                case mutations.PROCESSING_AUTHENTICATED_USER:
                    return {...userSession, authenticated}
                
                default:
                    return userSession;
            }
        },
        tasks(tasks = [], action){
            switch(action.type){
                case mutations.SET_STATE:
                    return action.state.tasks;
                case mutations.CREATE_TASK:
                    return [
                        ...tasks, {
                            id: action.taskID,
                            name: "new task",
                            group: action.groupID,
                            owner: action.ownerID,
                            isComplete: false,
                        }
                    ]
                case mutations.SET_TASK_COMPLETE:
                    return tasks.map(task => {
                        return task.id === action.taskID ? {...task, isComplete: !action.isComplete} : task})
                case mutations.SET_TASK_GROUP:
                    return tasks.map(task => {
                        return task.id === action.taskID ? {...task, group: action.groupID}: task
                    })
                case mutations.SET_TASK_NAME:
                    return tasks.map(task => {
                        return task.id === action.taskID ? {...task, name: action.name} : task;
                    })
            }
            return tasks;
        },
        comments(comments = [], action){
            switch(action.type){
                case mutations.SET_STATE:
                    return action.state.comments;
                case mutations.CREATE_COMMENT:
                    return [...comments, {
                        owner: action.ownerID, id: action.commentID, task: action.taskID, content: action.content
                    }]
            }
            return comments;
        },
        users(users = [], action){
            return users;
        },
        groups(groups = [], action){
            if(action.type === mutations.SET_STATE){
                return action.state.groups;
            }
            return groups;
        }
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
    // createLogger() -> middleware para debugear
)

for(let saga in sagas){
    sagaMiddleware.run(sagas[saga]);
}