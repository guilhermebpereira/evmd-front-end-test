/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import * as SQLite from 'expo-sqlite';
import _ from 'lodash';

const initialState = {
  users: [],
  userId: {},
  user: {},
};
const db = SQLite.openDatabase('front-end-test.db');

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_USER':
      return { ...state, user: _.find(state.users, { _id: action.id }) };
    case 'GET_USERS':
      return state.users;
    case 'SET_USERS':
      return { ...state, users: action.users };
    case 'SET_FAVORITE':
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE users SET favorite = ? WHERE _id = ?;',
          [action.user.favorite, action.user._id],
          (t, results) => (results.rowsAffected),
        );
      });
      return { ...state, user: action.user };
    case 'SET_USER_ID':
      return { ...state, userId: action.id };
    default:
      return state;
  }
}


const store = createStore(reducer);

export default store;
