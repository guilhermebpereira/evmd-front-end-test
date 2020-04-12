import {
    FETCH_USERS,
    FETCH_USERS_SUCCESS,
    SELECT_USER,
    FETCH_USER_DETAILS_SUCCESS,
    TOGGLE_CURRENT_USER_FAV_SUCCESS,
} from './UserTypes';

export const USER_INITIAL_STATE = {
    users: [],
    currentUser: {},
};

export default function (state = USER_INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: [...state.users, ...action.payload],
            };
        case SELECT_USER:
            return {
                ...state,
                currentUser: { _id: action.payload },
            };
        case FETCH_USER_DETAILS_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
            };
        case TOGGLE_CURRENT_USER_FAV_SUCCESS:
            return {
                ...state,
                currentUser: { ...state.currentUser, isFav: !state.currentUser.isFav },
            };
        default:
            return state;
    }
}
