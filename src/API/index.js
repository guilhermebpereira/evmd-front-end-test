import { Alert } from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("front-end-test.db");

export const AddFavorite = (id, { navigation }) => {
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE users SET favorite = ? WHERE _id = ?;`,
      [1, id],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          Alert.alert(
            "Sucesso",
            "Usuário Favoritado",
            [
              {
                text: "Ok",
                onPress: () => navigation.goBack()
              }
            ],
            { cancelable: false }
          );
        } else {
          alert("Atualização falhou");
        }
      },
      err => console.log(err)
    );
  });
};

export const DelFavorite = (id, { navigation }) => {
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE users SET favorite = ? WHERE _id = ?;`,
      [0, id],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          Alert.alert(
            "Sucesso",
            "Usuário Desfavoritado",
            [
              {
                text: "Ok",
                onPress: () => navigation.goBack()
              }
            ],
            { cancelable: false }
          );
        } else {
          alert("Atualização falhou");
        }
      },
      err => console.log(err)
    );
  });
};
