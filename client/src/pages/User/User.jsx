import React, { useState, useEffect } from "react";
import "./User.css";

function User() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ nome: "", email: "", senha: "" });
  const [editingUser, setEditingUser] = useState(null); // Estado para controle do usuário que está sendo editado

  useEffect(() => {
    loadUsers();
  }, []);
  useEffect(() => {
    loadUsers();
  }, users);

  const loadUsers = () => {
    fetch("http://localhost:3000/usuarios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Usuarios não encontrados");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Dados recebidos:", data);
        setUsers(data); // Define o estado com os produtos recebidos
      })
      .catch((error) => console.error("Erro ao buscar usuários:", error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/usuarios/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir usuário");
        }
        return response.json();
      })
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        alert("Usuário excluído com sucesso!");
      })
      .catch((error) => console.error("Erro ao excluir usuário:", error));
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setEditingUser(userToEdit); // Define o usuário que está sendo editado
  };

  const handleSaveEdit = () => {
    fetch(`http://localhost:3000/usuarios/${editingUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao atualizar usuário");
        }
        return response.json();
      })
      .then((updatedUser) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
        setEditingUser(null); // Limpa a edição após salvar
        alert("Usuário atualizado com sucesso!");
      })
      .catch((error) => console.error("Erro ao atualizar usuário:", error));
  };

  const handleAddUser = () => {
    fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao adicionar usuário");
        }
        return response.json();
      })
      .then((addedUser) => {
        setUsers((prevUsers) => [...prevUsers, addedUser]);
        setNewUser({ nome: "", email: "", senha: "" }); // Limpa os campos após adicionar
        alert("Usuário adicionado com sucesso!");
      })
      .catch((error) => console.error("Erro ao adicionar usuário:", error));
  };

  return (
    <div className="user-container">
      <h2>Lista de Usuários</h2>
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Senha</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {editingUser && editingUser.id === user.id ? (
                    <input
                      type="text"
                      value={editingUser.nome}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, nome: e.target.value })
                      }
                    />
                  ) : (
                    user.nome
                  )}
                </td>
                <td>
                  {editingUser && editingUser.id === user.id ? (
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, email: e.target.value })
                      }
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingUser && editingUser.id === user.id ? (
                    <input
                      type="password"
                      value={editingUser.senha}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          senha: e.target.value,
                        })
                      }
                    />
                  ) : (
                    "*****"
                  )}
                </td>
                <td className="actions">
                  {editingUser && editingUser.id === user.id ? (
                    <div className="edit-buttons">
                      <button
                        className="edit-button edit"
                        onClick={handleSaveEdit}
                      >
                        Salvar
                      </button>
                      <button
                        className="edit-button delete"
                        onClick={() => setEditingUser(null)} // Cancela a edição
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <div className="edit-buttons">
                      <button
                        className="edit-button edit"
                        onClick={() => handleEdit(user.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="edit-button delete"
                        onClick={() => handleDelete(user.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulário para adicionar usuário */}
      <div className="add-user-form">
        <input
          type="text"
          className="input-field"
          placeholder="Nome"
          value={newUser.nome}
          onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
        />
        <input
          type="email"
          className="input-field"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          className="input-field"
          placeholder="Senha"
          value={newUser.senha}
          onChange={(e) =>
            setNewUser({ ...newUser, senha: e.target.value })
          }
        />
        <button className="btn btn-success" onClick={handleAddUser}>
          Adicionar Usuário
        </button>
      </div>
    </div>
  );
}

export default User;