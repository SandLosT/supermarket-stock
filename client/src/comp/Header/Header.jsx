import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auten/AuthContext';
import './Header.css';

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    // Atualiza o estado de autenticação e limpa o token
    try {
      logout();
    } catch (e) {
      // fallback: garantir limpeza do token
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAuthenticated');
    }
    setShowDropdown(false);
    navigate('/'); // Redireciona para a página de login
  };

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/filtro" className="header-link">Filtro</Link>
        <Link to="/controle" className="header-link">Controle</Link>
      </div>
      <div className="header-right">
        <div className="user-dropdown">
          <span
            className="username"
            onClick={handleToggleDropdown}
          >
            Usuário
          </span>
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/user" className="dropdown-item">Alterar Conta / Criar Conta</Link>
              <button className="dropdown-item logout" onClick={handleLogout}>Sair</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
