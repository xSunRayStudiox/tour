import { createContext, useContext, useState } from 'react';
import axios from '../api/useAxios.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
   const [token, setToken] = useState(() => localStorage.getItem('token'));
   const [loading, setLoading] = useState(false);

   const isAuthenticated = !!token && !!user;
   const isAdmin = user?.role === 'admin';

   const login = async (email, password) => {
      setLoading(true);
      try {
         const res = await axios.post('/users/login', { email, password });
         setUser(res.data.user);
         setToken(res.data.token);
         localStorage.setItem('user', JSON.stringify(res.data.user));
         localStorage.setItem('token', res.data.token);
         return { success: true };
      } catch (err) {
         return { success: false, message: err.response?.data?.message || 'Login failed' };
      } finally {
         setLoading(false);
      }
   };

   const register = async (data) => {
      setLoading(true);
      try {
         const res = await axios.post('/users/register', data);
         setUser(res.data.user);
         setToken(res.data.token);
         localStorage.setItem('user', JSON.stringify(res.data.user));
         localStorage.setItem('token', res.data.token);
         return { success: true };
      } catch (err) {
         return { success: false, message: err.response?.data?.message || 'Register failed' };
      } finally {
         setLoading(false);
      }
   };

   const logout = () => {
      setUser(null);
      setToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
   };

   return (
      <AuthContext.Provider value={{ user, token, loading, login, register, logout, setUser, isAuthenticated, isAdmin }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);
