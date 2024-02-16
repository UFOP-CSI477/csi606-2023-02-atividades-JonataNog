import React, { useState, useEffect } from "react";
import './style.css';
import logo from '../../assets/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FiPower, FiEdit, FiTrash2, FiChevronsUp } from 'react-icons/fi';
import api from '../../services/api';
import Modal from './modal';

export default function Filmes() {
  const [filmes, setFilmes] = useState([]);
  const [selectedFilme, setSelectedFilme] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  async function editFilme(id) {
    try {
      navigate(`/filme/new/${id}`);
    } catch (error) {
      console.error(error);
      alert("Erro para editar o filme!");
    }
  }

  const handleSearch = async () => {
    try {
        const response = await api.get(`/filmes/name/${searchTerm}`);
        setFilmes([response.data]);
    } catch (error) {
        console.error(error);
        alert("Erro ao buscar filmes!");
    }
  };

  async function deleteFilme(id) {
    if (!window.confirm("Confirma exclusão do filme?")) {
      return;
    }

    try {
      await api.delete(`/filmes/${id}`);
      alert("Filme excluído com sucesso!");
      const response = await api.get('/filmes');
      setFilmes(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar o filme!");
    }
  }

  const openModal = (filme) => {
    setSelectedFilme(filme);
  };

  const closeModal = () => {
    setSelectedFilme(null);
  };

  useEffect(() => {
    api.get('/filmes')
      .then(response => {
        setFilmes(response.data);
      })
  }, []);

  return (
    <div className="filme-container">
      <header>
        <img src={logo} alt="Logo" />
        <span>Bem vindo, <strong>{"Jonata"}</strong>!</span>
        <Link className="button" to="/filme/new/0">Adicionar novo Filme</Link>
        <button type="button">
          <FiPower size={18} color="#251FC5" />
        </button>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          Buscar
        </button>
        <span><strong>Total de Filmes:</strong> {filmes.length}</span>
      </div>

      <h1>Filmes na Coleção</h1>
      <ul>
        {filmes.map(filme => (
          <li key={filme.id}>
            <strong>Título:</strong>
            <p>{filme.nome}</p>
            <strong>Mídia:</strong>
            <p>{filme.midia}</p>

            <button onClick={() => editFilme(filme.id)} type="button">
              <FiEdit size={20} color="#251FC5" />
            </button>
            <button onClick={() => deleteFilme(filme.id)} type="button">
              <FiTrash2 size={20} color="#251FC5" />
            </button>
            <button
              onClick={() => openModal(filme)}
              type="button"
              className="chevron-button"
              style={{ width: '32px', height: '32px', marginTop: '80px', paddingLeft: '10px'}}
            >
              <FiChevronsUp size={20} color="#251FC5" />
            </button>
          </li>
        ))}
      </ul>
      {selectedFilme && (
        <Modal filme={selectedFilme} onClose={closeModal} />
      )}
    </div>
  );
}
