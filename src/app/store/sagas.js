import {
    take,
    put,
    select
} from 'redux-saga/effects';
import * as mutations from './mutations';

import {v4 as uuidv4} from 'uuid';
import axios from 'axios';

import {history} from './history';

const url = process.env.NODE_ENV === `production` ? ``: "http://localhost:7777"; 

export function* taskCreationSaga(){
    while(true){
        const {groupID, ownerID} = yield take(mutations.REQUEST_TASK_CREATION);
        const taskID = uuidv4();
        yield put(mutations.createTask(groupID, taskID, ownerID));

        const {res} = yield axios.post(`${url}/task/new`, {
            task: {
                id: taskID,
                group: groupID,
                owner: ownerID,
                isComplete: false,
                name: "new Task"
            }
        })

    }
}

export function* taskModificationSaga(){
    while(true){
        const task = yield take([
            mutations.SET_TASK_COMPLETE,
            mutations.SET_TASK_GROUP,
            mutations.SET_TASK_NAME,
        ]);
        axios.post(`${url}/task/update`, {
            task: {
                id: task.taskID,
                name: task.name,
                group: task.groupID,
                isComplete: task.isComplete,

            }
        })
    }
}


export function * userAuthenticationSaga(){
    while(true){
        const  {username, password} = yield take(mutations.REQUEST_AUTHENTICATED_USER);
        try {

            const {data} = yield axios.post(`${url}/authenticate`, {username, password});

            if(!data){
                throw new Error();
            }
        
        yield put(mutations.setState(data.state));

        yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));

        history.push('/dashboard')

        } catch (error) {
            console.log(error);
            console.log("cant not autenthicate");
            yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
        }
    }
}

export function * createCommentSaga(){
    while(true){
        const {taskID, ownerID, content} = yield take(mutations.REQUEST_COMMENT_CREATION);

        const commentID = uuidv4();
        yield put(mutations.createComment(taskID, ownerID, commentID, content));

        yield axios.post(`${url}/comment/new`, {
            comment: {
                owner: ownerID, id: commentID, task: taskID, content
            }
        });

    }
}

export function * logoutSaga(){
    while(true){
        const {session} = yield take(mutations.REQUEST_LOGOUT);

        console.log("LOGOUT SESSION: ", session);

        history.push('/')


        yield put(mutations.userLogout(session));

    }
}