import React, { useState, useEffect } from "react";
import './style.css';
import { Link } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from "react-router";
import api from '../services/api';

export default function NewFilme(){
    const [nome, setNome] = useState('');
    const [diretor, setDiretor] = useState('');
    const [ano, setAno] = useState(0);
    const [pais, setPais] = useState('');
    const [genero, setGenero] = useState('');
    const [midia, setMidia] = useState('');

    const navigate = useNavigate();
    const {filmeId} = useParams();

    async function loadFilme(){
        try {
            const response = await api.get(`/filmes/${filmeId}`);
            setNome(response.data.nome);
            setDiretor(response.data.diretor);
            setAno(response.data.ano);
            setPais(response.data.pais);
            setGenero(response.data.genero);
            setMidia(response.data.midia);
        } catch (error) {
            console.error(error);
            alert("Erro ao recuperar o Filme");
            navigate('/filmes');
        }
    }

    useEffect(() => {
        if(filmeId === '0') return;
        else loadFilme();
    }, [filmeId])

    const saveOrUpdate = async (event) => {
        event.preventDefault();

        const data = {
            nome,
            diretor,
            ano,
            pais,
            genero,
            midia,
        };

        try {
            if(filmeId === '0'){
                await api.post('/filmes', data);
                alert("Filme inserido com sucesso!");
                navigate('/filmes');
            }
            else{
                data.id = filmeId;
                await api.put(`/filmes/${filmeId}`, data);
                alert("Filme atualizado com sucesso!");
                navigate('/filmes');
            }
            
        } catch (error) {
            console.error(error)
            alert("Erro na inserção do Filme");
        }
    }

    return(
        <div className="new-filme-container">
            <div className="content">
                <section className="form">
                    <h1>{filmeId === '0' ? 'Adicionar' : 'Atualizar'} Novo Filme</h1>
                    <p>Entre com as informações do filme!</p>
                    <Link className="back-link" to="/filmes">
                        <FiArrowLeft size={16} color="#251EC5"/>
                        Home
                    </Link>
                </section>

                <form onSubmit={saveOrUpdate}>
                    <input
                        placeholder="Nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)} 
                    />
                    <input
                        placeholder="Diretor"
                        value={diretor}
                        onChange={e => setDiretor(e.target.value)}
                    />
                    <input
                        placeholder="Ano" 
                        value={ano}
                        onChange={e => setAno(e.target.value)}
                    />
                    <input
                        placeholder="País" 
                        value={pais}
                        onChange={e => setPais(e.target.value)}
                    />
                    <select value={genero} onChange={e => setGenero(e.target.value)}>
                        <option value="">Selecione o Gênero</option>
                        <option value="TERROR">TERROR</option>
                        <option value="DRAMA">DRAMA</option>
                        <option value="COMEDIA">COMÉDIA</option>
                        <option value="ACAO">AÇÃO</option>
                        <option value="AVENTURA">AVENTURA</option>
                        <option value="DOCUMENTARIO">DOCUMENTÁRIO</option>
                        <option value="ANIMACAO">ANIMAÇÃO</option>
                        <option value="ROMANCE">ROMANCE</option>
                    </select>
                    <select value={midia} onChange={e => setMidia(e.target.value)}>
                        <option value="">Selecione a Mídia</option>
                        <option value="DVD">DVD</option>
                        <option value="BLURAY">BLURAY</option>
                    </select>

                    <button className="button" type="submit">{filmeId === '0' ? 'Adicionar' : 'Atualizar'}</button>
                </form>
            </div>
        </div>
    );
}
