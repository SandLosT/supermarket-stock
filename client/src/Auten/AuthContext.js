import React, { createContext, useState, useContext } from 'react';

// Criar o contexto de autenticação
const AuthContext = createContext();

// Provedor do contexto para envolver o App e suas páginas
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  // Função para login
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  // Função para logout
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook para acessar o contexto em qualquer lugar do aplicativo
export const useAuth = () => useContext(AuthContext);
