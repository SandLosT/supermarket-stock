import React, { useState, useEffect } from 'react';
import './Filter.css';

function Filter({ products }) {
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Função para aplicar o filtro
  const handleFilter = () => {
    let filtered = Array.isArray(products) ? [...products] : []; // Garante que products é um array

    if (nameFilter) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter((product) =>
        product.type.toLowerCase() === typeFilter.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  };

  // Atualiza o filtro sempre que os produtos mudarem
  useEffect(() => {
    if (Array.isArray(products)) {
      setFilteredProducts(products);
    }
  }, [products]);

  // Atualiza o filtro de acordo com os campos de busca
  useEffect(() => {
    handleFilter();
  }, [nameFilter, typeFilter]);

  return (
    <div className="filter">
      <h2>Filtrar Produtos</h2>
      <div className="form-group">
        <label htmlFor="name">Nome do Produto:</label>
        <input
          type="text"
          id="name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          placeholder="Digite o nome do produto"
        />
      </div>

      <div className="form-group">
        <label htmlFor="type">Tipo:</label>
        <select
          id="type"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">Selecione o tipo</option>
          <option value="legumes">Legumes</option>
          <option value="frutos">Frutos</option>
          <option value="panificacao">Panificação</option>
          <option value="bebidas">Bebidas</option>
          <option value="congelados">Congelados</option>
        </select>
      </div>

      <button onClick={handleFilter} className="filter-button">
        Filtrar
      </button>

      <h3>Resultados da Pesquisa</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhum produto encontrado</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Filter;
