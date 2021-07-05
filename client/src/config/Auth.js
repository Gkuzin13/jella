import React, { useEffect, useState } from 'react';
import api from './axiosConfig';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserStatus = async () => {
      try {
        const { data } = await api.get('/user');

        if (data) {
          setUser(() => data);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
