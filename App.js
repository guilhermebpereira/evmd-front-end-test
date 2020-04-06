import React, { useEffect, useCallback } from "react";
import { CreateDatabase } from "./src/scripts";
import { downloadDatabase } from "./src/Database";
import Routes from "./src/routes";

export default function App() {
  const initializeDB = useCallback(async () => {
    await CreateDatabase();
  });

  useEffect(() => {
    initializeDB();
    downloadDatabase();
  }, []);

  return <Routes />;
}
