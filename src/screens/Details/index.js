import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View, Image, StyleSheet, Text, TouchableOpacity,
} from 'react-native';

import { ReadDatabase } from '../../scripts';


const Details = () => {
  const { userSelect } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleFavorite = useCallback(() => {
    const db = ReadDatabase.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE users SET favorite=${userSelect.favorite === 0 ? 1 : 0} WHERE _id='${userSelect._id}'`,
        [],
        (txn, results) => {
          if (results.rowsAffected > 0) {
            dispatch({ type: 'TOGGLE_FAVORITE' });
          }
        },
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: userSelect.picture }}
          style={styles.image}
        />
      </View>
      <View
        style={styles.detailsContainer}
      >
        <Text>
          Nome:
          {userSelect.name}
        </Text>
        <Text>
          E-mail:
          {userSelect.email}
        </Text>
        <Text>
          Idade:
          {userSelect.age}
        </Text>
        <Text>
          Salário:
          {userSelect.balance}
        </Text>
        <Text>
          Latitude:
          {userSelect.latitude}
        </Text>
        <Text>
          Longitude:
          {userSelect.longitude}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleFavorite()}
        style={styles.button}
      >
        <Text>
          {userSelect.favorite === 0 ? 'Adicionar os favorito' : 'Remover dos favoritos'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f3f3f3',
  },
  detailsContainer: {
    width: '100%',
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    backgroundColor: '#e5e5e5',
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#b1b1b1',
    backgroundColor: '#e5e5e5',
  },
});

export default Details;
