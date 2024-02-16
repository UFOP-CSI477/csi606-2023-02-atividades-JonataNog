import React, {useState} from "react";
import './style.css';   
import logo from '../../assets/Logo.png';
import { useNavigate } from "react-router-dom";
import api from '../../services/api';

export default function NewLogin(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleNewLogin = async (event) =>{
        event.preventDefault();

        const data = {
            username,
            password,
        };

        try {
            await api.post('usuario', data);
            alert("Usuário cadastrado com sucesso");
            navigate('/');
            
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar usuário");
        }
    }

    return(
        <div className="login-container">
            <section className="form">
                <img src={logo} alt="Logo"/>
                <form>
                    <h1>Cadastre uma conta</h1>
                    <input 
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input 
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button onClick={handleNewLogin} className="button" type="submit">Cadastrar</button>
                </form>
            </section>
            
        </div>
    )
}