import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Redireciona para a página de login
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/filtro" className="header-link">Filtro</Link>
        <Link to="/controle" className="header-link">Controle</Link>
      </div>
      <div className="header-right">
        <button className="logout-btn" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </header>
  );
}

export default Header;