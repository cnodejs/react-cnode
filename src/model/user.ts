import { useState } from 'react';

export default () => {
  const [user, setUser] = useState<string>();
  const login = (name: string) => setUser(name);
  const logout = () => setUser('');
  return { user, login, logout };
};
