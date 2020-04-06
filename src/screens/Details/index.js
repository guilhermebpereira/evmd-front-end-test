/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View, Image, StyleSheet, Text, TouchableOpacity,
} from 'react-native';

function Details() {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.user);

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: details.picture,
          }}
          style={styles.image}
        />
      </View>
      <View
        style={styles.detailsContainer}
      >
        <Text>
          Nome:
          {' '}
          {details.name}
        </Text>
        <Text>
          E-mail:
          {' '}
          {details.email}
        </Text>
        <Text>
          Idade:
          {' '}
          {details.age}
        </Text>
        <Text>
          Salário:
          {' '}
          {details.balance}
        </Text>
        <Text>
          Latitude:
          {' '}
          {details.latitude}
        </Text>
        <Text>
          Longitude:
          {' '}
          {details.longitude}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch({ type: 'SET_FAVORITE', user: (details.favorite === 0 ? { ...details, favorite: 1 } : { ...details, favorite: 0 }) })}
      >
        <Text>
          {details.favorite === 0 ? 'Favoritar' : 'Desfavoritar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

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
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#b1b1b1',
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
  },
});
export default Details;
