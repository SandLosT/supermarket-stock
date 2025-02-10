import React, { useState, useEffect, useCallback } from 'react';
import './Filter.css';

function Filter() {
  const [mercadorias, setMercadorias] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [filteredMercadorias, setFilteredMercadorias] = useState([]);

  // Fetch the list of mercadorias from the server
  useEffect(() => {
    fetch('http://localhost:3000/mercadorias', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar mercadorias');
        }
        return response.json();
      })
      .then((data) => {
        setMercadorias(data);
        setFilteredMercadorias(data); // Initialize the filtered list with all mercadorias
      })
      .catch((error) => console.error('Erro ao buscar mercadorias:', error));
  }, []);

  // Function to apply the filter
  const handleFilter = useCallback(() => {
    let filtered = Array.isArray(mercadorias) ? [...mercadorias] : []; // Ensure mercadorias is an array

    if (nameFilter) {
      filtered = filtered.filter((mercadoria) =>
        mercadoria.nome.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter((mercadoria) =>
        mercadoria.grupo.toLowerCase() === typeFilter.toLowerCase() // Filter by type
      );
    }

    setFilteredMercadorias(filtered);
  }, [mercadorias, nameFilter, typeFilter]); // Add dependencies for mercadorias, nameFilter, and typeFilter

  // Update the filter whenever the mercadorias change
  useEffect(() => {
    if (Array.isArray(mercadorias)) {
      setFilteredMercadorias(mercadorias);
    }
  }, [mercadorias]);

  // Update the filter based on the search fields
  useEffect(() => {
    handleFilter();
  }, [handleFilter]); // Ensure handleFilter is called whenever it changes

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
          <option value="A">A-Legumes</option>
          <option value="A">A-Frutos</option>
          <option value="A">A-Panificação</option>
          <option value="B">B-Bebidas</option>
          <option value="A">A-Congelados</option>
          <option value="H">H-Higiene Pessoal</option>
          <option value="L">L-Produtos de Limpeza</option>
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
                <td>{mercadoria.nome}</td>
                <td>{mercadoria.valor}</td>
                <td>{mercadoria.quantidade}</td>
                <td>{mercadoria.grupo}</td>
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