import React, { useState, useEffect, useCallback } from 'react';
import './Filter.css';

function Filter({ mercadorias }) {
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [filteredMercadorias, setFilteredMercadorias] = useState([]);

  // Função para aplicar o filtro
  const handleFilter = useCallback(() => {
    let filtered = Array.isArray(mercadorias) ? [...mercadorias] : []; // Garante que mercadorias é um array

    if (nameFilter) {
      filtered = filtered.filter((mercadoria) =>
        mercadoria.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter((mercadoria) =>
        mercadoria.type.toLowerCase() === typeFilter.toLowerCase() // Filtrando pelo tipo
      );
    }

    setFilteredMercadorias(filtered);
  }, [mercadorias, nameFilter, typeFilter]); // Adicionando dependências de mercadorias, nameFilter e typeFilter

  // Atualiza o filtro sempre que as mercadorias mudarem
  useEffect(() => {
    if (Array.isArray(mercadorias)) {
      setFilteredMercadorias(mercadorias);
    }
  }, [mercadorias]);

  // Atualiza o filtro de acordo com os campos de busca
  useEffect(() => {
    handleFilter();
  }, [handleFilter]); // Aqui estamos garantindo que handleFilter seja chamado sempre que for alterado.

  return (
    <div className="filter">
      <h2>Filtrar Mercadorias</h2>
      <div className="form-group">
        <label htmlFor="name">Nome da Mercadoria:</label>
        <input
          type="text"
          id="name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          placeholder="Digite o nome da mercadoria"
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
          <option value="A">Legumes</option>
          <option value="A">Frutos</option>
          <option value="A">Panificação</option>
          <option value="B">Bebidas</option>
          <option value="A">Congelados</option>
          <option value="H">Higiene Pessoal</option>
          <option value="L">Produtos de Limpeza</option>
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
          {filteredMercadorias.length > 0 ? (
            filteredMercadorias.map((mercadoria) => (
              <tr key={mercadoria.id}>
                <td>{mercadoria.id}</td>
                <td>{mercadoria.name}</td>
                <td>{mercadoria.price}</td>
                <td>{mercadoria.quantity}</td>
                <td>{mercadoria.type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhuma mercadoria encontrada</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Filter;
