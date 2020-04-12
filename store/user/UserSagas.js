import { takeEvery, put, call, select } from 'redux-saga/effects';
import {
    FETCH_USERS,
    FETCH_USERS_ERROR,
    FETCH_USERS_SUCCESS,
    FETCH_USER_DETAILS,
    FETCH_USER_DETAILS_SUCCESS,
    FETCH_USER_DETAILS_ERROR,
    TOGGLE_CURRENT_USER_FAV_ERROR,
    TOGGLE_CURRENT_USER_FAV_SUCCESS,
    TOGGLE_CURRENT_USER_FAV,
} from './UserTypes';
import * as UserApi from './UserApi';

export function* fetchUsers(action) {
    const defaultLimit = 50;
    const errorAction = { type: FETCH_USERS_ERROR };
    const successAction = { type: FETCH_USERS_SUCCESS };
    const limit = action.payload?.limit || 50;

    try {
        const offset = yield select((state) => state.user.users.length);
        const response = yield call(UserApi.fetchUsers, offset, limit);
        successAction.payload = response;

        yield put(successAction);
    } catch {
        yield put(errorAction);
    }
}

export function* fetchUserDetails({ payload: userId }) {
    const errorAction = { type: FETCH_USER_DETAILS_ERROR };
    const successAction = { type: FETCH_USER_DETAILS_SUCCESS };
    
    try {
        const response = yield call(UserApi.fetchUserDetails, userId);
        successAction.payload = response;
        yield put(successAction);
    } catch {
        yield put(errorAction);
    }
}


export function* toggleCurrentUserFav() {
    const errorAction = { type: TOGGLE_CURRENT_USER_FAV_ERROR };
    const successAction = { type: TOGGLE_CURRENT_USER_FAV_SUCCESS };
    
    try {
        const currentUserId = yield select((state) => state.user.currentUser._id);
        yield call(UserApi.toggleUserFav, currentUserId);
        successAction.payload = currentUserId;
        yield put(successAction);
    } catch {
        yield put(errorAction);
    }
}

const sagas = [
    takeEvery(FETCH_USERS, fetchUsers),
    takeEvery(FETCH_USER_DETAILS, fetchUserDetails),
    takeEvery(TOGGLE_CURRENT_USER_FAV, toggleCurrentUserFav)
];

export default sagas;
