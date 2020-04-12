import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import user from './user/UserReducers';

export default function generateStore() {
    const sagaMiddleware = createSagaMiddleware();
    const reducers = combineReducers({ user });
    const store = createStore(reducers, applyMiddleware(sagaMiddleware));
    
    sagaMiddleware.run(sagas);

    return store;
}
