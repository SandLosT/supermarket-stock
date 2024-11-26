import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './comp/Header/Header';
import Footer from './comp/Footer/Footer';
import Login from './pages/Login/Login';
import Controle from './pages/Control/Control';
import Filtro from './pages/Filter/Filter';
import User from './pages/User/User'; // Importando a página User

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticação

  return (
    <Router>
      <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </Router>
  );
}

function AppContent({ isAuthenticated, setIsAuthenticated }) {
  const location = useLocation(); // Pega a localização atual da aplicação

  return (
    <>
      {/* Exibe o Header apenas se não estiver na página de login */}
      {location.pathname !== '/' && (
        <Header isAuthenticated={isAuthenticated} />
      )}

      {/* Exibe a área de conteúdo com base na rota */}
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/filtro" element={<Filtro />} />
        <Route path="/controle" element={<Controle />} />
        <Route path="/user" element={<User />} /> {/* Adicionando a rota para a página User */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;
