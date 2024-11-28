import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './comp/Header/Header';
import Footer from './comp/Footer/Footer';
import Login from './pages/Login/Login';
import Controle from './pages/Control/Control';
import Filtro from './pages/Filter/Filter';
import User from './pages/User/User'; // Importando a página User
import { AuthProvider, useAuth } from './Auten/AuthContext'; // Importando o contexto de autenticação
import PrivateRoute from './Auten/PrivateRoute'; // Importando o PrivateRoute

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
  const { currentUser } = useAuth(); // Acessa o estado do usuário autenticado

  return (
    <>
      {/* Exibe o Header apenas se o usuário estiver logado */}
      {currentUser && <Header />}

      {/* Exibe o conteúdo com base nas rotas */}
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Rotas privadas que só podem ser acessadas se o usuário estiver logado */}
        <PrivateRoute path="/filtro" component={Filtro} />
        <PrivateRoute path="/controle" component={Controle} />
        <PrivateRoute path="/user" component={User} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
