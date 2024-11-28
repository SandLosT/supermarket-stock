import React from "react";
import { Route, Navigate } from "react-router-dom"; // Alterado para importar o Navigate
import { useAuth } from './AuthContext'; // Importa o hook de autenticação

// Rota privada para proteger páginas específicas
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth(); // Pega o estado do usuário autenticado

  return (
    <Route
      {...rest}
      element={
        currentUser ? (
          <Component /> // Exibe o componente se o usuário estiver logado
        ) : (
          <Navigate to="/" /> // Redireciona para a página de login caso contrário
        )
      }
    />
  );
};

export default PrivateRoute;
