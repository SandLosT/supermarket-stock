import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Realiza qualquer limpeza necessária (ex: limpar sessão ou token)
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
            onClick={handleToggleDropdown} // Mostra ou esconde o menu ao clicar
          >
            Usuário
          </span>
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/user" className="dropdown-item">Alterar Conta / Criar Conta</Link>
              <button className="dropdown-item" onClick={handleLogout}>Sair</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
