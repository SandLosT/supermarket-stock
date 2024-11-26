import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './User.css';

function User() {
  const [activeTab, setActiveTab] = useState('alterar'); // Aba padrão
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Atualiza a aba ativa
    navigate('/user'); // Garante que a URL seja sempre /user
  };

  return (
    <div className="user-page"> {/* Classe específica para aplicar os estilos apenas na página de user */}
      <div className="user-container">
        <div className="sidebar">
          <button
            className={`sidebar-item ${activeTab === 'alterar' ? 'active' : ''}`}
            onClick={() => handleTabClick('alterar')}
          >
            Alterar Usuário
          </button>
          <button
            className={`sidebar-item ${activeTab === 'criar' ? 'active' : ''}`}
            onClick={() => handleTabClick('criar')}
          >
            Criar Usuário
          </button>
        </div>

        <div className="content">
          {activeTab === 'alterar' ? <AlterarUsuario /> : <CriarUsuario />}
        </div>
      </div>
    </div>
  );
}

function AlterarUsuario() {
  const [userData, setUserData] = useState({
    email: 'usuario@exemplo.com',
    senha: 'senha123',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmAction === 'edit') {
      setIsEditing(false);
      alert('Edição concluída!');
    }
  };

  const handleDelete = () => {
    setConfirmAction('delete');
  };

  const confirmDelete = () => {
    console.log('Conta excluída:', userData);
    alert('Conta excluída com sucesso!');
    navigate('/login');
  };

  return (
    <div className="alterar-usuario"> {/* Classe para estilizar o formulário de alteração de usuário */}
      <h2>Alterar Conta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="Digite o novo email"
            required
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Nova Senha</label>
          <input
            type="password"
            name="senha"
            value={userData.senha}
            onChange={handleInputChange}
            placeholder="Digite a nova senha"
            required
            disabled={!isEditing}
          />
        </div>
        <div className="edit-buttons">
          {isEditing ? (
            <>
              <button className="edit-button edit" type="submit">
                Confirmar Alteração
              </button>
              <button
                className="edit-button cancel"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                className="edit-button edit"
                type="button"
                onClick={() => setIsEditing(true)}
              >
                Editar
              </button>
              <button
                className="edit-button delete"
                type="button"
                onClick={handleDelete}
              >
                Excluir Conta
              </button>
            </>
          )}
        </div>
      </form>

      {confirmAction === 'delete' && (
        <div className="delete-confirmation"> {/* Classe para a confirmação de exclusão */}
          <p>Tem certeza de que deseja excluir sua conta?</p>
          <button className="edit-button delete" onClick={confirmDelete}>
            Confirmar Exclusão
          </button>
          <button
            className="edit-button cancel"
            onClick={() => setConfirmAction(null)}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

function CriarUsuario() {
  const [newUserData, setNewUserData] = useState({ email: '', senha: '' });
  const [userCreated, setUserCreated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserCreated(true);
    alert('Novo usuário cadastrado!');
  };

  return (
    <div className="criar-usuario"> {/* Classe para estilizar o formulário de criação de usuário */}
      <h2>Criar Conta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={newUserData.email}
            onChange={handleInputChange}
            placeholder="Digite o email"
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            name="senha"
            value={newUserData.senha}
            onChange={handleInputChange}
            placeholder="Digite a senha"
            required
          />
        </div>
        <button className="edit-button edit" type="submit">
          Criar
        </button>
      </form>

      {userCreated && <p>Usuário criado com sucesso!</p>}
    </div>
  );
}

export default User;
