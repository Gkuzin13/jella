import React, { useEffect, useState } from 'react';
import api from './axiosConfig';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserStatus = async () => {
      try {
        const { data } = await api.get('/user');

        setUser(() => data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getUserStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
