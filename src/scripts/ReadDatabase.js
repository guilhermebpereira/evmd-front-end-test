import * as SQLite from 'expo-sqlite';
import Constants from 'expo-constants';

const { DB_NAME } = Constants.manifest.extra.env;

export default {
  getConnection: () => SQLite.openDatabase(DB_NAME),
};
