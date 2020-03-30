import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";


export async function downloadDatabase() {
  const sqliteDirectory = `${FileSystem.documentDirectory}SQLite`;

  // First, ensure that the SQLite directory is indeed a directory
  // For that we will first get information about the filesystem node
  // and handle non-existent scenario.
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
  console.log(`Will download ${uriToDownload} to ${pathToDownloadTo}`);

  await FileSystem.downloadAsync(uriToDownload, pathToDownloadTo);
}
