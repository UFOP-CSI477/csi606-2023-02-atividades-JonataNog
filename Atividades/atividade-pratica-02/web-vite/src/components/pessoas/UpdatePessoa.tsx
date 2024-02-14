import { useEffect, useState } from "react"
import api from "../../services/api";
import { useNavigate } from "react-router";
import { CidadeInterface } from "../cidades/ListCidades";
import { TipoSanguineoInterface } from "../tipo-sanguineo/ListTipoSanguineo";
import { useParams } from "react-router-dom";

const UpdatePessoa = () => {

    const [ nome, setNome ] = useState('');
    const [ rua, setRua ] = useState('');
    const [ numero, setNumero ] = useState('');
    const [ complemento, setComplemento ] = useState('');
    const [ rg, setRg ] = useState('');
    const [ cidadeId, setCidadeId ] = useState(0);
    const [ tipoId, setTipoId ] = useState(0);
    const navigate = useNavigate();

    const { id } = useParams();

    const [cidades, setCidades] = useState<CidadeInterface[]>([]);
    const [tipos, setTipos] = useState<TipoSanguineoInterface[]>([]);

    useEffect(() => {
        api.get('/cidades')
            .then(response =>{
                setCidades(response.data);
        })
    }, []);

    useEffect(() => {
        api.get('/tipo-sanguineo')
            .then(response =>{
                setTipos(response.data);
        })
    }, []);

    useEffect(() => {
        api.get(`/pessoas/id/${id}`)
            .then(response => {
                setNome(response.data.nome);
                setRua(response.data.rua);
                setNumero(response.data.numero);
                setComplemento(response.data.complemento);
                setRg(response.data.rg);
                setCidadeId(response.data.cidadeId)
                setTipoId(response.data.tipoId)
            });
    },[id]);

    const handleUpdatePessoa = async (event : React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const data = {
            id,
            nome,
            rua,
            numero,
            complemento,
            rg,
            cidade: {
              id: cidadeId,
            },
            tipo:{
                id: tipoId,
            }
          };

        try {
            await api.put('/pessoas', data)
            alert("Pessoa atualizada com sucesso!");
            navigate('/pessoas');

        } catch (error) {
            console.error(error)
            alert("Erro na atualização da Pessoa");
        }
    }

    return(
        <div>
            <h3>Atualização de Pessoas: {nome}</h3>

            <form onSubmit={handleUpdatePessoa}>
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
                    <label htmlFor="numero">Número</label>
                    <input 
                        type="text" 
                        name="numero" 
                        id="numero" 
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
                    <label htmlFor="rg">RG</label>
                    <input 
                        type="text" 
                        name="rg" 
                        id="rg" 
                        value={rg}
                        onChange={e => setRg(e.target.value)}
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
                <div>
                    <label htmlFor="tipoId">Tipo Sanguíneo</label>
                    <select 
                        name="tipoId" 
                        id="tipoId"
                        onChange={e => setTipoId( parseInt(e.target.value) )}>
                            <option value="0" selected>Selecione:</option>
                            {
                                tipos.map( tipo => (
                                    <option value={tipo.id}>{tipo.tipo}</option>
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

export default UpdatePessoa