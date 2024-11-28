import React from "react";
import { Navigate } from "react-router-dom"; // Use o Navigate para redirecionar
import { useAuth } from './AuthContext'; // Importa o hook de autenticação

// Rota privada para proteger páginas específicas
const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth(); // Obtém o estado de autenticação

  if (!isAuthenticated) {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to="/" />;
  }

  // Se estiver autenticado, renderiza o componente passado em "element"
  return element;
};

export default PrivateRoute;
