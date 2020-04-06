import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

export async function downloadDatabase() {
  const sqliteDirectory = `${FileSystem.documentDirectory}SQLite`;

  const { exists, isDirectory } = await FileSystem.getInfoAsync(
    sqliteDirectory
  );
  if (!exists) {
    await FileSystem.makeDirectoryAsync(sqliteDirectory);
  } else if (!isDirectory) {
    throw new Error("SQLite dir is not a directory");
  }

  const pathToDownloadTo = `${sqliteDirectory}/frot-end-test.db`;
  const uriToDownload = Asset.fromModule(
    require("../assets/front-end-test.db")
  ).uri;

  await FileSystem.downloadAsync(uriToDownload, pathToDownloadTo);
}
