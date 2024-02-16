import React, { useState } from "react";
import './style.css';   
import logo from '../../assets/Logo.png';
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const data = {
            username,
            password,
        };

        try {
            const response = await api.post("/usuario/login", data);
            
            console.log(response.data); 
            navigate("/filmes");

        } 
        catch (error) {
            console.error("Erro durante a autenticação:", error.response.data);
            alert("Usuário ou senha inválidos");
            navigate("/");
        }
    };

    const handleCadastrar = () => {
        navigate('/new-login');
    }
  

    return(
        <div className="login-container">
            <section className="form">
                <img src={logo} alt="Logo"/>
                <form onSubmit={handleLogin}>
                    <h1>Acesse a sua conta</h1>
                    <input 
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input 
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button className="button" type="submit">Login</button>
                    <button className="button" type="button" onClick={handleCadastrar}>Cadastrar</button>
                </form>
            </section>
        </div>
    )
}
