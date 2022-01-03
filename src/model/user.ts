import { useState, useCallback } from 'react';
import { loadInitialState } from '@/util';

export default () => {
  const initialState = loadInitialState();

  const [user, setUser] = useState<UserModel | undefined>(initialState.user);

  const login = useCallback((data: InitialState, useLocalStorage = false) => {
    const { user: userInfo } = data;

    if (useLocalStorage) {
      window.localStorage.setItem('initialState', JSON.stringify(data));
    }
    setUser(userInfo);
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem('initialState');
    setUser(undefined);
  }, []);

  const reload = useCallback(() => {
    const state = loadInitialState();
    setUser(state.user);
  }, []);

  return { user, login, logout, reload };
};
