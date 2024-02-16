import React from "react";
import './modal.css'; // Estilize o Modal.css conforme necessário

const Modal = ({ filme, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{filme.nome}</h2>
        <p><strong>ID:</strong> {filme.id}</p>
        <p><strong>Título:</strong> {filme.nome}</p>
        <p><strong>Diretor:</strong> {filme.diretor}</p>
        <p><strong>Ano:</strong> {filme.ano}</p>
        <p><strong>País:</strong> {filme.pais}</p>
        <p><strong>Gênero:</strong> {filme.genero}</p>
        <p><strong>Mídia:</strong> {filme.midia}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Modal;
