import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { FAKE_USERS } from './../../mocks';

const { DB_NAME } = Constants.manifest.extra.env;

export function fetchUsers(offset, limit) {
    return new Promise((resolve, reject) => {
        const database = SQLite.openDatabase(DB_NAME);
        database.transaction((transaction) => {
            transaction.executeSql(
                `SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`,
                [],
                (something, { rows: { _array: users } }) => resolve(users),
                (error) => reject(error)
            );
        });
    });
}

export function fetchUserDetails(userId) {
    return new Promise((resolve, reject) => {
        const database = SQLite.openDatabase(DB_NAME);

        database.transaction((transaction) => {
            transaction.executeSql(
                `SELECT * FROM users WHERE _id = '${userId}'`,
                [],
                (_, { rows: { _array } }) =>
                    resolve({
                        ..._array[0],
                        isFav: _array[0].isFav ? true : false,
                    }),
                (error) => reject(error)
            );
        });
    });
}

export function addColumn(tableName, columnName, columnType) {
    return new Promise((resolve, reject) => {
        const database = SQLite.openDatabase(DB_NAME);

        database.transaction((transaction) => {
            transaction.executeSql(
                `ALTER TABLE ${tableName} 
                ADD COLUMN ${columnName} ${columnType}`,
                [],
                () => resolve(),
                (_, error) => reject(error)
            );
        });
    });
}

export async function toggleUserFav(userId) {
    const tableName = 'users';
    const columnName = 'isFav';
    const columnType = 'integer';
    const { isFav } = await fetchUserDetails(userId);

    const toggleFunc = () =>
        new Promise((resolve, reject) => {
            const database = SQLite.openDatabase(DB_NAME);

            database.transaction((transaction) => {
                transaction.executeSql(
                    `UPDATE users SET isFav = ? WHERE _id = '${userId}'`,
                    [isFav ? 0 : 1],
                    () => resolve(userId),
                    (_, error) => reject(error)
                );
            });
        });

    try {
        await toggleFunc();
    } catch {
        await addColumn(tableName, columnName, columnType);
        await toggleFunc();
    }
}
