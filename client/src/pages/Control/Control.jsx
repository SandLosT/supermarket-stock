import React, { useState, useEffect } from "react";
import "./Control.css";

function Control() {
  const [nome, setName] = useState("");
  const [valor, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("");
  const [mercadorias, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Carregar produtos ao montar o componente
  useEffect(() => {
    fetch("http://localhost:3000/mercadorias", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((response) => response.json())
      .then((mercadorias) => {
        setProducts((prevProducts) => [...prevProducts, mercadorias]);
        clearForm();
        alert("Produto adicionado com sucesso!");
      })
      .catch((error) => console.error("Erro ao adicionar produto:", error));
  }, []);

  const handleAddProduct = () => {
    if (!nome || !valor || !quantity || !type) {
      alert("Preencha todos os campos!");
      return;
    }

    const newProduct = {
      nome: nome,
      grupo: type,
      valor: valor,
      quantidade: quantity,
    };

    fetch("http://localhost:3000/mercadorias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((mercadorias) => {
        setProducts((prevProducts) => [...prevProducts, mercadorias]);
        clearForm();
        alert("Produto adicionado com sucesso!");
      })
      .catch((error) => console.error("Erro ao adicionar produto:", error));
  };

  const handleEditProduct = (id) => {
    const productToEdit = mercadorias.find((mercadorias) => mercadorias.id === id);
    setEditingProduct(productToEdit);
    setName(productToEdit.nome);
    setPrice(productToEdit.valor);
    setQuantity(productToEdit.quantidade);
    setType(productToEdit.grupo);
  };

  const handleSaveEditedProduct = () => {
    if (!nome || !valor || !quantity || !type) {
      alert("Preencha todos os campos!");
      return;
    }

    const updatedProduct = {
      nome: nome,
      grupo: type,
      valor: parseFloat(valor),
      quantidade: parseInt(quantity, 10),
    };

    fetch(`http://localhost:3000/mercadorias/${editingProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((updated) => {
        setProducts((prevProducts) =>
          prevProducts.map((mercadorias) =>
            mercadorias.id === updated.id ? updated : mercadorias
          )
        );
        clearForm();
        setEditingProduct(null);
        alert("Produto atualizado com sucesso!");
      })
      .catch((error) => console.error("Erro ao editar produto:", error));
  };

  const handleDeleteProduct = (nome) => {
    fetch(`http://localhost:3000/mercadorias/${nome}`, {
      method: "DELETE",
    })
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((mercadorias) => mercadorias.nome !== nome)
        );
        alert("Produto excluído com sucesso!");
      })
      .catch((error) => console.error("Erro ao excluir produto:", error));
  };

  const clearForm = () => {
    setName("");
    setPrice("");
    setQuantity("");
    setType("");
  };

  return (
    <div className="controle">
      <h2 style={{ textAlign: "center" }}>Controle de Estoque</h2>
      <div className="form-container" style={{ margin: "0 auto", width: "50%" }}>
        <div className="form-group">
          <label>Nome do Produto</label>
          <input type="text" value={nome} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Preço</label>
          <input type="number" value={valor} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Quantidade</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Grupo</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Selecione</option>
            <option value="A">Legumes</option>
            <option value="A">Frutos</option>
            <option value="A">Panificação</option>
            <option value="B">Bebidas</option>
            <option value="A">Congelados</option>
            <option value="H">Higiene Pessoal</option>
            <option value="L">Produtos de Limpeza</option>
          </select>
        </div>
        {editingProduct ? (
          <button onClick={handleSaveEditedProduct}>Salvar Edição</button>
        ) : (
          <button onClick={handleAddProduct}>Adicionar Produto</button>
        )}
      </div>
      <div className="product-list">
        <h3>Lista de Produtos</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Grupo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {mercadorias.map((mercadorias) => (
              <tr key={mercadorias.id}>
                <td>{mercadorias.id}</td>
                <td>{mercadorias.nome}</td>
                <td>R${mercadorias.valor}</td>
                <td>{mercadorias.quantidade}</td>
                <td>{mercadorias.grupo}</td>
                <td>
                  <button onClick={() => handleEditProduct(mercadorias.id)}>Editar</button>
                  <button onClick={() => handleDeleteProduct(mercadorias.nome)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Control;
