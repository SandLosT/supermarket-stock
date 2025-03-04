import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./comp/Header/Header";
import Footer from "./comp/Footer/Footer";
import Login from "./pages/Login/Login";
import Control from "./pages/Control/Control";
import Filtro from "./pages/Filter/Filter";
import User from "./pages/User/User";
import { AuthProvider, useAuth } from "./Auten/AuthContext";
import PrivateRoute from "./Auten/PrivateRoute";


function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth(); // Usa o estado de autenticação do contexto

  return (
    <>
      {isAuthenticated && <Header />} {/* Exibe o Header se o usuário estiver autenticado */}

      <Routes>
        <Route path="/" element={<Login />} />

        {/* Rotas privadas usando PrivateRoute */}
        <Route
          path="/filtro"
          element={<PrivateRoute element={<Filtro />} />} // Passando o componente como 'element'
        />
        <Route
          path="/controle"
          element={<PrivateRoute element={<Control />} />} // Passando o componente como 'element'
        />

        <Route
          path="/user"
          element={<PrivateRoute element={<User />} />} // Passando o componente como 'element'
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
