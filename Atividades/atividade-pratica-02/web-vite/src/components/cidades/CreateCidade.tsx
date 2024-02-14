import { useEffect, useState } from "react"
import api from "../../services/api";
import { useNavigate } from "react-router";
import { EstadoInterface } from "../estados/ListEstados";

const CreateCidade = () => {

    const [ nome, setNome ] = useState('');
    const [ estadoId, setEstadoId ] = useState(0);
    const navigate = useNavigate();

    const [estados, setEstados] = useState<EstadoInterface[]>([]);

    useEffect(() => {
        api.get('/estados')
            .then(response =>{
                setEstados(response.data);
        })

    }, []);

    const handleNewCidade = async (event : React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const data = {
            nome,
            estado: {
              id: estadoId,
            },
          };

        try {
            await api.post('/cidades', data)
            alert("Cidade inserida com sucesso!");
            navigate('/cidades');

        } catch (error) {
            console.error(error)
            alert("Erro na inserção da Cidade");
        }

    }


    return(
        <div>
            <h3>Cadastro de Cidades: {nome} - {estadoId}</h3>

            <form onSubmit={handleNewCidade}>
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
                        onChange={e => setEstadoId( parseInt(e.target.value) )}>
                            <option value="0" selected>Selecione:</option>
                            {
                                estados.map( estado => (
                                    <option value={estado.id}>{estado.nome}</option>
                                ))
                            }
                    </select>
                </div>

                <button type="submit">Cadastrar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    )
}

export default CreateCidade