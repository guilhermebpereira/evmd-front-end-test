import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import PropTypes from "prop-types";
import { UserCard } from "../../components";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("front-end-test.db");

const Home = ({ navigation }) => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT _id, name, age, email, latitude, longitude, balance, favorite, picture FROM users ORDER BY favorite DESC;`,
        [],
        (_, { rows: { _array } }) => {
          setUserList(_array);
          setIsLoading(false);
        },
        err => console.log(err)
      );
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#a3a3a3" />
        </View>
      ) : (
        <ScrollView>
          {userList.map((item, i = 1) => (
            <View
              key={i++}
              style={
                item.favorite === 0
                  ? styles.container
                  : styles.containerFavorited
              }
            >
              <UserCard
                name={item.name.toString()}
                age={item.age.toString()}
                email={item.email.toString()}
                picture={item.picture}
                onPress={() => {
                  navigation.navigate("Details", {
                    id: item._id,
                    name: item.name,
                    age: item.age,
                    email: item.email,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    balance: item.balance,
                    picture: item.picture,
                    favorite: item.favorite
                  });
                }}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
};

Home.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#f3f3f3",
    alignItems: "center",
    justifyContent: "center"
  },
  containerFavorited: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#c2c2c2",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Home;
