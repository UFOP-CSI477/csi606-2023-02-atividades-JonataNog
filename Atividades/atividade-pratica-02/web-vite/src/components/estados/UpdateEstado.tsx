import { useEffect, useState } from "react"
import api from "../../services/api";
import { useNavigate, useParams } from "react-router";


const UpdateEstado = () => {

    const { id } = useParams();
    const [ nome, setNome ] = useState('');
    const [ sigla, setSigla ] = useState('');
    const navigate = useNavigate();

    useEffect(() =>{
        api.get(`estados/id/${id}`)
            .then(response => {
                setNome(response.data.nome);
                setSigla(response.data.sigla);
            });
    }, [id])


    const handleUpdateEstado = async (event : React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const data = {
            id: parseInt(String(id)),
            nome,
            sigla
        };

        try {
            await api.put(`/estados/${id}`, data)
            alert("Estado atualizado com sucesso!");
            navigate('/estados');

        } catch (error) {
            console.error(error)
            alert("Erro na inserção do Estado");
        }

    }


    return(
        <div>
            <h3>Cadastro de Estados: {nome} - {sigla}</h3>

            <form onSubmit={handleUpdateEstado}>
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input 
                        type="text" 
                        name="nome" 
                        id="nome" 
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        />
                </div>

                <div>
                    <label htmlFor="sigla">Sigla</label>
                    <input 
                        type="text" 
                        name="sigla" 
                        id="sigla" 
                        value={sigla}
                        onChange={e => setSigla(e.target.value)}
                        />
                </div>

                <button type="submit">Atualizar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    )
}

export default UpdateEstado