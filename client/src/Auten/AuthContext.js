import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica o localStorage ao iniciar a aplicação
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Converte para booleano
  }, []);

  // Função de login atualiza estado e salva no localStorage
  const login = () => {
    setIsAuthenticated(true);
  };

  // Função de logout
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
