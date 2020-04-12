import  { all } from 'redux-saga/effects';
import user from './user/UserSagas';

export default function* sagas() { 
    yield all([...user]);
}