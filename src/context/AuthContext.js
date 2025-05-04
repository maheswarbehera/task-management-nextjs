"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && typeof token === "string") {
      const decode = jwtDecode(token)
      if (decode) setUser(decode.username); 
    } else {
      setUser(null);  
    }
    
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decode = jwtDecode(token)
    setUser(decode.username);
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
