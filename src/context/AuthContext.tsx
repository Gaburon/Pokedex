import React, {useState, createContext} from 'react';
import {} from 'react-native';

export const AuthContext = createContext({
  auth: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({children}: any) {
  const [auth, setAuth] = useState(null);

  const login = userData => {
    setAuth(userData);
  };

  const logout = () => {
    setAuth(null);
  };

  const valueContext = {
    auth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
