import {createStore, applyMiddleware} from 'redux';
import { createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
// import * as sagas from './sagas.mock'
import * as sagas from './sagas';
import appReducers from './reducers';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    appReducers,
    applyMiddleware(createLogger(), sagaMiddleware)
    // createLogger() -> middleware para debugear
)

for(let saga in sagas){
    sagaMiddleware.run(sagas[saga]);
}