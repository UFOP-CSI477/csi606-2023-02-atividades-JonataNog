import { useEffect, useState } from "react"
import api from "../../services/api";
import { useNavigate } from "react-router";
import { EstadoInterface } from "../estados/ListEstados";
import { useParams } from "react-router-dom";

const UpdateCidade = () => {

    const [ nome, setNome ] = useState('');
    const [ estadoId, setEstadoId ] = useState(0);
    const navigate = useNavigate();

    const [estados, setEstados] = useState<EstadoInterface[]>([]);

    const { id } = useParams();

    useEffect(() => {
        api.get('/estados')
            .then(response =>{
                setEstados(response.data);
        })

    }, []);

    useEffect(() => {
        api.get(`/cidades/id/${id}`)
            .then(response => {
                setNome(response.data.nome);
                setEstadoId(response.data.estadoId)
            });
    },[id]);

    const handleUpdateCidade = async (event : React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const data = {
            id,
            nome,
            estado: {
              id: estadoId,
            },
          };

        try {
            await api.put(`/cidades/${id}`, data)
            alert("Cidade atualizada com sucesso!");
            navigate('/cidades');

        } catch (error) {
            console.error(error)
            alert("Erro na atualização da Cidade");
        }

    }


    return(
        <div>
            <h3>Atualização da Cidades: {nome} - {estadoId}</h3>

            <form onSubmit={handleUpdateCidade}>
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
                    <label htmlFor="estadoId">Estado</label>
                    <select 
                        name="estadoId" 
                        id="estadoId"
                        value={estadoId}
                        onChange={e => setEstadoId( parseInt(e.target.value) )}>
                            <option value="0">Selecione:</option>
                            {
                                estados.map( estado => (
                                    <option value={estado.id}>{estado.nome}</option>
                                ))
                            }
                    </select>
                </div>

                <button type="submit">Atualizar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    )
}

export default UpdateCidade