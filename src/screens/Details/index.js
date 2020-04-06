import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AddFavorite, DelFavorite } from "../../API/index";

const Details = ({ navigation, route }) => {
  const { id } = route.params;
  const { name } = route.params;
  const { age } = route.params;
  const { email } = route.params;
  const { latitude } = route.params;
  const { longitude } = route.params;
  const { balance } = route.params;
  const { picture } = route.params;
  const { favorite } = route.params;

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: picture
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text>Nome: {name}</Text>
        <Text>E-mail: {email}</Text>
        <Text>Idade: {age}</Text>
        <Text>Salário: {balance}</Text>
        <Text>Latitude: {latitude}</Text>
        <Text>Longitude: {longitude}</Text>
      </View>
      {favorite === 0 ? (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => AddFavorite(id, { navigation })}
          >
            <Text>Favorite</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => DelFavorite(id, { navigation })}
          >
            <Text>Unfavorite</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f3f3f3"
  },
  detailsContainer: {
    width: "100%",
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    backgroundColor: "#e5e5e5"
  },
  image: {
    width: 200,
    height: 200
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#b1b1b1",
    backgroundColor: "#e5e5e5"
  }
});

export default Details;
