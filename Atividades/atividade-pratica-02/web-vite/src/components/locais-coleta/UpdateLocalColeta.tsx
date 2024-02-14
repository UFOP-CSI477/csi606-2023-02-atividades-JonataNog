import { useEffect, useState } from "react"
import api from "../../services/api";
import { useNavigate } from "react-router";
import { CidadeInterface } from "../cidades/ListCidades";
import { useParams } from "react-router-dom";


const UpdateLocalColeta = () => {

    const [ nome, setNome ] = useState('');
    const [ rua, setRua ] = useState('');
    const [ numero, setNumero ] = useState('');
    const [ complemento, setComplemento] = useState('');
    const [ cidadeId, setCidadeId ] = useState(0);
    const navigate = useNavigate();

    const { id } = useParams();

    const [cidades, setCidades] = useState<CidadeInterface[]>([]);

    useEffect(() => {
        api.get('/cidades')
            .then(response =>{
                setCidades(response.data);
        })

    }, []);

    useEffect(() => {
        api.get(`/local-coleta/id/${id}`)
            .then(response => {
                setNome(response.data.nome);
                setRua(response.data.rua);
                setNumero(response.data.numero);
                setComplemento(response.data.complemento);
                setCidadeId(response.data.estadoId)
            });
    },[id]);

    const handleUpdateLocalColeta = async (event : React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const data = {
            id,
            nome,
            rua,
            numero,
            complemento,
            cidade: {
              id: cidadeId,
            },
          };

        try {
            await api.put(`/local-coleta/${id}`, data)
            alert("Local de Coleta atualizado com sucesso!");
            navigate('/locaisColeta');

        } catch (error) {
            console.error(error)
            alert("Erro na atualização do Local de Coleta");
        }

    }

    return(
        <div>
            <h3>Atualização de Local de Coleta: {nome} - {cidadeId}</h3>

            <form onSubmit={handleUpdateLocalColeta}>
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
                    <label htmlFor="rua">Rua</label>
                    <input 
                        type="text" 
                        name="rua" 
                        id="rua" 
                        value={rua}
                        onChange={e => setRua(e.target.value)}
                        />
                </div>
                <div>
                    <label htmlFor="número">Número</label>
                    <input 
                        type="text" 
                        name="número" 
                        id="número" 
                        value={numero}
                        onChange={e => setNumero(e.target.value)}
                        />
                </div>
                <div>
                    <label htmlFor="complemento">Complemento</label>
                    <input 
                        type="text" 
                        name="complemento" 
                        id="complemento" 
                        value={complemento}
                        onChange={e => setComplemento(e.target.value)}
                        />
                </div>

                <div>
                    <label htmlFor="cidadeId">Cidade</label>
                    <select 
                        name="cidadeId" 
                        id="cidadeId"
                        onChange={e => setCidadeId( parseInt(e.target.value) )}>
                            <option value="0" selected>Selecione:</option>
                            {
                                cidades.map( cidade => (
                                    <option value={cidade.id}>{cidade.nome}</option>
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

export default UpdateLocalColeta