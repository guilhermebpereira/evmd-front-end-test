/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';


function UserCard({ onPress, data }) {
  const dispatch = useDispatch();


  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(dispatch({ type: 'GET_USER', id: data._id }))}
    >
      <View>
        <Image
          source={{ uri: data.picture }}
          style={styles.image}
        />
      </View>
      <View style={styles.text}>
        <Text>{`${data.name}, ${data.age}`}</Text>
        <Text>{data.email}</Text>
      </View>
    </TouchableOpacity>
  );
}

UserCard.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    borderColor: '#e9e9e9',
    marginTop: 5,
  },
  text: {
    marginLeft: 15,
  },
  image: {
    borderRadius: 5,
    width: 50,
    height: 50,
  },

});

export default UserCard;
