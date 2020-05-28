import {
    take,
    put,
    call,
    select
} from 'redux-saga/effects';
import * as mutations from './mutations';

import {v4 as uuidv4} from 'uuid';
import axios from 'axios';

import {history} from './history';

const url = process.env.NODE_ENV === `production` ? ``: "http://localhost:7777"; 


export function* groupDeleteSaga(){
    while(true){
        const {id} = yield take([mutations.REQUEST_DELETE_GROUP]);
        const session = yield select(state => state.session);
        
        const res = yield axios.post(`${url}/group/delete`, {id, session});
        

        if(res.status=== 200){
            yield put({type: mutations.DELETE_GROUP, id});
        }
    }
}
export function* groupCreationSaga(){
    while(true){
        yield take([mutations.REQUEST_GROUP_CREATION]);

        const session = yield select(state => state.session);
        const group = {
            name: "generic group",
            owner: session.id
        }

        try{
            const res =  yield axios.post(`${url}/group/new`, {
                group,
                session
            });
            const newGroup = res.data;
            yield put(mutations.addNewGroup(newGroup));
        }catch(e){
            console.error("hehe")
        }


    }
}


export function* groupModificationSaga(){
    while(true){
        const change = yield take([
            mutations.SET_GROUP_NAME,
        ]);
        console.log("change",change)
        const group = yield select(state => state.groups.filter(group => group._id === change.groupID)[0]);
        const session = yield select(state => state.session);


        const res = yield axios.post(`${url}/group/update`,{
            group:{
                id: group._id,
                name: group.name,
                owner: group.owner,
            },
            session
        });

        console.log(res);

        

    }
}




export function* taskCreationSaga(){
    while(true){
        const {groupID, ownerID, name} = yield take(mutations.REQUEST_TASK_CREATION);
        const session = yield select(state => state.session);

        const res = yield axios.post(`${url}/task/new`, {
            task: {
                group: groupID,
                owner: ownerID,
                name,
                isComplete: false
            },session
        })
        const taskID = res.data._id;
        yield put(mutations.createTask(groupID, taskID, ownerID, name));


    }
}




export function* taskModificationSaga(){
    while(true){
        const change = yield take([
            mutations.SET_TASK_STATE,
            mutations.SET_TASK_GROUP,
            mutations.SET_TASK_NAME,
        ]);
        
        const tasks = yield select(state => state.tasks.filter(task => task._id === change.taskID));
        const session = yield select(state => state.session);
        const task = tasks[0];
        
        axios.post(`${url}/task/update`, {
            task: {
                id: task._id,
                group: task.group,
                name: task.name,
                isComplete: task.isComplete,
            }, session
        })
    }
}

export function * taskDeleteSaga(){
    while(true){
        const {id} = yield take(mutations.DELETE_TASK);
       try {
        const session = yield select(state => state.session);

        const res = yield call(axios.post, `${url}/task/delete`, {id, session})   
        
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

            yield put({type: mutations.CREATED_USER, username});
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
            if(data.state.groups.length){
                console.log(data.state.groups)
            }
        yield put(mutations.setState(data.state));
        yield put({type: mutations.SET_TOKEN, token: data.token})

        yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED, {}));

        history.push('/dashboard')

        } catch (error) {
            console.log(error);
            console.log("cant not autenthicate");
            yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED, {}));
        }
    }
}

export function * createCommentSaga(){
    while(true){
        const {taskID, ownerID, content} = yield take(mutations.REQUEST_COMMENT_CREATION);
        const session = yield select(state => state.session);

        const commentID = uuidv4();
        yield put(mutations.createComment(taskID, ownerID, commentID, content));

        yield axios.post(`${url}/comment/new`, {
            comment: {
                _id: commentID, owner: ownerID, task: taskID, content
            },session
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

