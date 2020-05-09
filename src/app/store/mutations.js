export const REQUEST_TASK_CREATION = `REQUEST_TASK_CREATION`;
export const REQUEST_AUTHENTICATED_USER = `REQUEST_AUTHENTICATED_USER`;
export const CREATE_TASK = `CREATE_TASK`;

export const DELETE_TASK = `DELETE_TASK`;
export const DELETE_TASK_SUCCESS = `DELETE_TASK_SUCCESS`;
export const DELETE_TASK_FAILED = `DELETE_TASK_FAILED`;


export const SET_TASK_COMPLETE = `SET_TASK_COMPLETE`;
export const SET_TASK_NAME = `SET_TASK_NAME`;
export const SET_TASK_GROUP = `SET_TASK_GROUP`;
export const PROCESSING_AUTHENTICATED_USER = `PROCESSING_AUTHENTICATED_USER`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
export const SET_STATE = `SET_STATE`;
export const REQUEST_LOGOUT = `REQUEST_LOGOUT`;
export const LOGOUT = `LOGOUT`;
export const REQUEST_CREATED_USER = `REQUEST_CREATED_USER`;
export const CREATED_USER = `CREATED_USER`;
export const NOT_CREATED_USER = `NOT_CREATED_USER`;
export const CREATING_USER = `CREATING_USER`
export const PROCESSING_CREATED_USER = `PROCESSING_CREATED_USER`;
 
export const REQUEST_COMMENT_CREATION = `REQUEST_COMMENT_CREATION`;
export const CREATE_COMMENT = `CREATE_COMMENT`;




export const requestCreateUser = (username, password) => ({
    type: REQUEST_CREATED_USER,
    username, password
}) 

export const processCreateUser = (status = CREATING_USER, errores = [], session = null) => ({
    type: PROCESSING_CREATED_USER,
    session, user: status, error: errores
})

export const userLogout = (session) => ({
    type: LOGOUT,
    clean: session,
})

export const requestLogut = (session = []) => ({
    type: REQUEST_LOGOUT,
    session 
})

export const createComment = (taskID, ownerID,  commentID, content) => ({
    type: CREATE_COMMENT,
    taskID, ownerID,  commentID ,content
})

export const requestCommentCreation = (taskID, ownerID, content) => ({
    type: REQUEST_COMMENT_CREATION,
    taskID, ownerID, content
})

export const processAuthenticateUser = (status = AUTHENTICATING, session = null) => ({
    type: PROCESSING_AUTHENTICATED_USER,
    session, authenticated: status,
})

export const requestAuthenticateUser = (username, password) => ({
    type: REQUEST_AUTHENTICATED_USER,
    username,
    password,
})

export const requestTaskCreation = (groupID, ownerID, name) =>  ({
    type: REQUEST_TASK_CREATION,
    groupID, ownerID, name
});

export const createTask = (groupID, taskID, ownerID, name) => ({
    type: CREATE_TASK,
    groupID, taskID, ownerID, name
})

export const setTaskCompletation = (id, isComplete) => ({
    type: SET_TASK_COMPLETE,
    taskID: id, isComplete
})

export const setTaskGroup = (id, groupID) => ({
    type: SET_TASK_GROUP,
    taskID: id,
    groupID,
})

export const setTaskName = (id, name) => ({
    type: SET_TASK_NAME,
    taskID: id,
    name,
})

export const setState = (state = {} ) => ({
    type: SET_STATE,
    state,
})