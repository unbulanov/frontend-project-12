import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userId'));
    const logIn = () => setLoggedIn(true);
    const logOut = () => {
        localStorage.removeItem('userId');
        setLoggedIn(false);
  };
  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('userId'));

    return userData.token ? { Authorization: `Bearer ${userData.token}` } : {}
  };

  return (
    <AuthContext.Provider value={{ loggedIn ,logIn,  logOut, getAuthHeader }}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
