import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./comp/Header/Header";
import Footer from "./comp/Footer/Footer";
import Login from "./pages/Login/Login";
import Control from "./pages/Control/Control";
import Filtro from "./pages/Filter/Filter";
import User from "./pages/User/User";
import { AuthProvider } from "./Auten/AuthContext";
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
  const location = useLocation();
  const isLoginPage = location.pathname === "/" || location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Header />} {/* Exibe o Header em todas as rotas exceto a página de login */}

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
