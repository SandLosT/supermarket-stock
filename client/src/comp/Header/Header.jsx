import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const authent = localStorage.getItem("token");

  // Se o token não existir, o Header não deve ser renderizado
  if (!authent) {
    return null;  // Não renderiza o Header se não houver token
  }

  const handleauthent = () => {
    if (!authent) {
      alert("Esta é uma rota privada e você não está autenticado!");
    } else {
      navigate('/user'); // Redireciona para a página de usuário
    }
  };

  const handleLogout = () => {
    // Realiza qualquer limpeza necessária (ex: limpar sessão ou token)
    localStorage.removeItem("token"); // Remove o token do localStorage
    navigate('/'); // Redireciona para a página de login
  };

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/filtro" className="header-link">Filtro</Link>
        <Link to="/controle" className="header-link">Controle</Link> {/* Corrigido para "/controle" */}
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
              <button onClick={handleauthent} className="dropdown-item">Alterar Conta / Criar Conta</button>
              <button className="dropdown-item logout" onClick={handleLogout}>Sair</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
