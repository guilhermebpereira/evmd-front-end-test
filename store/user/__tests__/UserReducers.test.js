import {
    FETCH_USERS_SUCCESS,
    SELECT_USER,
    FETCH_USER_DETAILS_SUCCESS,
    TOGGLE_CURRENT_USER_FAV_SUCCESS,
} from './../UserTypes';
import { USER_INITIAL_STATE } from '../UserReducers';
import { FAKE_USERS, FAKE_USER_DETAILS } from './../../../mocks';
import reducers from '../UserReducers';

describe('User | Reducers', () => {
    it(`${FETCH_USERS_SUCCESS}`, () => {
        const fakeResponse = FAKE_USERS;
        const expectedState = {
            ...USER_INITIAL_STATE,
            users: fakeResponse,
        };
        const action = {
            type: FETCH_USERS_SUCCESS,
            payload: fakeResponse,
        };
        const state = reducers(USER_INITIAL_STATE, action);

        expect(state).toEqual(expectedState);
    });

    it(`${SELECT_USER}`, () => {
        const fakeId = 'super-hard-to-guess-id';
        const action = {
            type: SELECT_USER,
            payload: fakeId,
        };
        const expectedState = {
            ...USER_INITIAL_STATE,
            currentUser: {
                _id: fakeId,
            },
        };
        const state = reducers(USER_INITIAL_STATE, action);

        expect(state).toEqual(expectedState);
    });

    it(`${FETCH_USER_DETAILS_SUCCESS}`, () => {
        const action = {
            type: FETCH_USER_DETAILS_SUCCESS,
            payload: FAKE_USER_DETAILS,
        };
        const expectedState = {
            ...USER_INITIAL_STATE,
            currentUser: FAKE_USER_DETAILS,
        };

        const state = reducers(USER_INITIAL_STATE, action);

        expect(state).toEqual(expectedState);
    });

    it(`${TOGGLE_CURRENT_USER_FAV_SUCCESS} when it whas not favorited`, () => {
        const action = {
            type: TOGGLE_CURRENT_USER_FAV_SUCCESS,
            payload: FAKE_USER_DETAILS._id,
        };
        const mockedInitialState = {
            ...USER_INITIAL_STATE,
            currentUser: FAKE_USER_DETAILS,
        };
        const expectedState = {
            ...USER_INITIAL_STATE,
            currentUser: {
                ...FAKE_USER_DETAILS,
                isFav: !mockedInitialState.currentUser.isFav
            },
        };

        const state = reducers(mockedInitialState, action);

        expect(state).toEqual(expectedState);
    });

    it(`${TOGGLE_CURRENT_USER_FAV_SUCCESS} when it was favorited`, () => {
        const action = {
            type: TOGGLE_CURRENT_USER_FAV_SUCCESS,
            payload: FAKE_USER_DETAILS._id,
        };
        const mockedInitialState = {
            ...USER_INITIAL_STATE,
            currentUser: { ...FAKE_USER_DETAILS, isFav: true },
        };
        const expectedState = {
            ...USER_INITIAL_STATE,
            currentUser: {
                ...FAKE_USER_DETAILS,
                isFav: !mockedInitialState.currentUser.isFav,
            },
        };

        const state = reducers(mockedInitialState, action);

        expect(state).toEqual(expectedState);
    });
});
