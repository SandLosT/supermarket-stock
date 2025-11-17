import React, { createContext, useState, useContext } from 'react';

// Criar o contexto de autenticação
const AuthContext = createContext();

// Provedor do contexto para envolver o App e suas páginas
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  // Função para login: faz POST para o backend e armazena o token
  const login = async (email, senha) => {
    const url = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    const resp = await fetch(`${url}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.mensagem || 'Erro ao autenticar');
    }

    const data = await resp.json();
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
    } else {
      throw new Error(data.mensagem || 'Resposta de autenticação inválida');
    }
  };

  // Função para logout
  const logout = () => {
    setIsAuthenticated(false);
    // Atualiza o localStorage para refletir o logout e remove o token
    try {
      localStorage.setItem('isAuthenticated', 'false');
      localStorage.removeItem('authToken');
    } catch (e) {
      // se localStorage falhar por algum motivo, apenas ignore
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook para acessar o contexto em qualquer lugar do aplicativo
export const useAuth = () => useContext(AuthContext);
