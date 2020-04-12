import { runSaga } from 'redux-saga';
import {
    FETCH_USERS_SUCCESS,
    FETCH_USER_DETAILS_SUCCESS,
    TOGGLE_CURRENT_USER_FAV,
} from '../UserTypes';
import {
    fetchUsers,
    fetchUserDetails,
    toggleCurrentUserFav,
} from '../UserSagas';
import * as UserApi from '../UserApi';
import { FAKE_USERS, FAKE_USER_DETAILS } from './../../../mocks';
import {
    FETCH_USERS,
    FETCH_USER_DETAILS,
    TOGGLE_CURRENT_USER_FAV_SUCCESS,
} from './../UserTypes';
import { USER_INITIAL_STATE } from './../UserReducers';

describe('User | Sagas', () => {
    it('fetch users', async () => {
        const dispatch = jest.fn();
        const successAction = {
            type: FETCH_USERS_SUCCESS,
            payload: FAKE_USERS,
        };
        const action = { type: FETCH_USERS };

        UserApi.fetchUsers = jest.fn(() => Promise.resolve(FAKE_USERS));

        await runSaga(
            { dispatch, getState: () => ({ user: USER_INITIAL_STATE }) },
            fetchUsers,
            action
        );

        expect(dispatch).toHaveBeenCalledWith(successAction);
    });

    it('fetch user details', async () => {
        const dispatch = jest.fn();
        const successAction = {
            type: FETCH_USER_DETAILS_SUCCESS,
            payload: FAKE_USER_DETAILS,
        };
        const action = {
            type: FETCH_USER_DETAILS,
            payload: FAKE_USER_DETAILS._id,
        };

        UserApi.fetchUserDetails = jest.fn(() =>
            Promise.resolve(FAKE_USER_DETAILS)
        );

        await runSaga({ dispatch }, fetchUserDetails, action);

        expect(dispatch).toHaveBeenCalledWith(successAction);
    });

    it('mark current user as favorited/not favorited toggling it', async () => {
        const dispatch = jest.fn();
        const action = {
            type: TOGGLE_CURRENT_USER_FAV,
            payload: FAKE_USER_DETAILS._id,
        };
        const successAction = {
            type: TOGGLE_CURRENT_USER_FAV_SUCCESS,
            payload: FAKE_USER_DETAILS._id,
        };
        const mockedInitialState = {
            user: {
                ...USER_INITIAL_STATE,
                currentUser: FAKE_USER_DETAILS,
            },
        };

        UserApi.toggleUserFav = jest.fn(() =>
            Promise.resolve(FAKE_USER_DETAILS._id)
        );

        await runSaga(
            { dispatch, getState: () => mockedInitialState },
            toggleCurrentUserFav
        );

        expect(dispatch).toHaveBeenCalledWith(successAction);
    });
});
