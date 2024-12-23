import React, { useState } from "react";
import "./User.css";

function User() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: "", senha: "" });
  const [editingUser, setEditingUser] = useState(null); // Estado para controle do usuário que está sendo editado

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    alert("Usuário excluído com sucesso!");
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setEditingUser(userToEdit); // Define o usuário que está sendo editado
  };

  const handleSaveEdit = () => {
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? editingUser : user
    );
    setUsers(updatedUsers);
    setEditingUser(null); // Limpa a edição após salvar
    alert("Usuário atualizado com sucesso!");
  };

  const handleAddUser = () => {
    const newUserObj = {
      id: users.length + 1,
      email: newUser.email,
      senha: newUser.senha,
    };
    setUsers([...users, newUserObj]);
    setNewUser({ email: "", senha: "" }); // Limpa os campos após adicionar
  };

  return (
    <div className="user-container">
      <h2>Lista de Usuários</h2>
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
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
