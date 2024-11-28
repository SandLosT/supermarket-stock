import React, { useState, useEffect } from 'react';
import './Control.css';

function Control() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('');
  const [products, setProducts] = useState([]);

  // Fetch para buscar todos os produtos na inicialização
  useEffect(() => {
    fetch('http://localhost:3000/mercadorias') // Ajuste para o endpoint correto do back-end
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Erro ao buscar produtos:', error));
  }, []);

  const handleAddProduct = () => {
    if (!name || !price || !quantity || !type) {
      alert('Preencha todos os campos');
      return;
    }

    const newProduct = {
      nome: name,
      preco: parseFloat(price),
      quantidade: parseInt(quantity),
      grupo: type.toLowerCase(),
    };

    // Enviar produto para o back-end
    fetch('http://localhost:3000/mercadorias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao adicionar produto');
        }
        return response.json();
      })
      .then(() => {
        // Atualizar a lista de produtos no front-end
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        setName('');
        setPrice('');
        setQuantity('');
        setType('');
        alert('Produto adicionado com sucesso!');
      })
      .catch((error) => console.error('Erro ao adicionar produto:', error));
  };

  return (
    <div className="control">
      <h2>Controle de Estoque</h2>
      <div className="form-container">
        <div className="form-field">
          <label>Nome do Produto</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Preço</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Quantidade</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Tipo</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Selecione o tipo</option>
            <option value="A">Legumes - A</option>
            <option value="frutos">Frutos</option>
            <option value="panificacao">Panificação</option>
            <option value="bebidas">Bebidas</option>
            <option value="congelados">Congelados</option>
          </select>
        </div>
        <button className="add-button" onClick={handleAddProduct}>
          Adicionar Produto
        </button>
      </div>

      <div className="product-list">
        <h3>Lista de Produtos</h3>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.nome} - R${product.preco} - {product.quantidade} unidades -{' '}
              {product.grupo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Control;
