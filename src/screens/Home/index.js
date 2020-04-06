import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { ReadDatabase } from '../../scripts';

import { UserCard } from '../../components';

const Home = ({ navigation }) => {
  const { users, count } = useSelector((state) => state);
  const dispatch = useDispatch();

  const getUsers = useCallback((cont) => {
    const db = ReadDatabase.getConnection();

    db.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM users Limit 50 OFFSET ${cont * 50} `,
        [],
        (tx, { rows: { _array } }) => {
          dispatch({ type: 'GET_USER', usuarios: _array });
        },
      );
    });
  }, []);

  useEffect(() => {
    getUsers(count);
  }, []);

  return (
    <View
      style={styles.container}
    >
      <FlatList
        data={users}
        renderItem={(({ item }) => (
          <UserCard
            name={item.name}
            age={item.age}
            email={item.email}
            picture={item.picture}
            onPress={() => {
              dispatch({ type: 'SELECT_USER', user: item });
              navigation.navigate('Details');
            }}
          />
        ))}
        keyExtractor={({ _id }) => _id}
        onEndReached={() => getUsers(count)}
        onEndReachedThreshold={0.15}
      />
    </View>
  );
};

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
