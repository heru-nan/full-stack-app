import {
    take,
    put,
    call
} from 'redux-saga/effects';
import * as mutations from './mutations';

import {v4 as uuidv4} from 'uuid';
import axios from 'axios';

import {history} from './history';

const url = process.env.NODE_ENV === `production` ? ``: "http://localhost:7777"; 

export function* taskCreationSaga(){
    while(true){
        const {groupID, ownerID, name} = yield take(mutations.REQUEST_TASK_CREATION);

        const res = yield axios.post(`${url}/task/new`, {
            task: {
                group: groupID,
                owner: ownerID,
                isComplete: false,
                name
            }
        })
        const taskID = res.data._id;
        yield put(mutations.createTask(groupID, taskID, ownerID, name));


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

export function * taskDeleteSaga(){
    while(true){
        const {id} = yield take(mutations.DELETE_TASK);
        console.log(id);
       try {
        const res = yield call(axios.post, `${url}/task/delete`, {id})   
        console.log(res);
        yield put({type: mutations.DELETE_TASK_SUCCESS, id});
        history.push('/dashboard');


       } catch (error) {
           yield put({type: mutations.DELETE_TASK_FAILED, error});
       }
    }
}

export function * requests(){
    while(true){
        yield take(mutations.DELETE_TASK, taskDeleteSaga);
    }
}

export function * userCreationSaga(){
    while(true){
        const {username, password} = yield take(mutations.REQUEST_CREATED_USER);

        try{
            const {data} = yield axios.post(`${url}/createUser`, {username, password});
            
            if(!data.flag){
                yield put(mutations.processCreateUser(mutations.NOT_CREATED_USER, [data.error]));
            }else{

            yield put(mutations.processCreateUser(mutations.CREATED_USER));
            alert("USER CREATE");
            
            history.push('/');
            }
        }
        catch(e){
            console.log(e.message)
        }
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

