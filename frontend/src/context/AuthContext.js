import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // Validate token on app load
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/validateToken`, {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
          },
          withCredentials: true,
        });

        setUser({
          id: response.data.user.id,
          username: response.data.user.username,
          email: response.data.user.email,
          token: Cookies.get('token'),
        });
        setIsAuth(true);
      } catch (error) {
        Cookies.remove('token');
        setIsAuth(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  const login = (data) => {
    setUser({
      id: data._id,
      username: data.username,
      email: data.email,
      token: data.token,
    });
    setIsAuth(true);
    Cookies.set('token', data.token, { expires: 30 });
  };

  const logout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/users/logout`, {}, {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
        withCredentials: true,
      });
      setUser(null);
      setIsAuth(false);
      Cookies.remove('token');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
