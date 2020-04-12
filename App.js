import React, { useEffect, useCallback } from 'react';
import { Provider } from 'react-redux';
import { CreateDatabase } from './src/scripts';
import Routes from './src/routes';
import createStore from './store/store';
import { fetchUsers } from './store/user/UserApi';

export default function App() {
  const initializeDB = useCallback(async () => {
    await CreateDatabase();
  });

  useEffect(() => {
      initializeDB();
  }, []);

  return (  
      <Provider store={createStore()}>
          <Routes />
      </Provider>
  );
}
