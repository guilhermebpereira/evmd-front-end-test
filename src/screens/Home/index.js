/* eslint-disable no-underscore-dangle */
import React from 'react';
import * as SQLite from 'expo-sqlite';
import { useDispatch, useSelector } from 'react-redux';

import {
  View, StyleSheet, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';

import { UserCard } from '../../components';


function Home({ navigation }) {
  const db = SQLite.openDatabase('front-end-test.db');
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  function getUser() {
    db.transaction((tx) => {
      tx.executeSql(
        'select * from users ;',
        [],
        (_, { rows: { _array } }) => dispatch({ type: 'SET_USERS', users: _array }),
      );
    });
  }

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <View
      style={styles.container}
    >
      <FlatList
        data={users}
        keyExtractor={(item) => (item._id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <UserCard
            key={item._id}
            data={item}
            onPress={() => navigation.navigate('Details')}
          />
        )}
      />
    </View>
  );
}

Home.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
