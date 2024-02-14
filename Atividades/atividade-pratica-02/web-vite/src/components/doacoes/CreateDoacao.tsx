import { useEffect, useState } from "react"
import api from "../../services/api";
import { useNavigate } from "react-router";
import { PessoaInterface } from "../pessoas/ListPessoas";
import { LocalColetaInterface } from "../locais-coleta/ListLocalColeta";

const CreateDoacao = () => {

    const [ pessoaId, setPessoaId ] = useState(0);
    const [ localId, setLocalId ] = useState(0);
    const [ date, setDate] = useState('')

    const navigate = useNavigate();

    const [pessoas, setPessoas] = useState<PessoaInterface[]>([]);
    const [locaisColeta, setLocaisColeta] = useState<LocalColetaInterface[]>([]);

    useEffect(() => {
        api.get('/pessoas')
            .then(response =>{
                setPessoas(response.data);
        })
    }, []);

    useEffect(() => {
        api.get('/local-coleta')
            .then(response =>{
                setLocaisColeta(response.data);
        })
    }, []);

    const handleNewDoacao = async (event : React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const data = {
            pessoa: {
                id: pessoaId,
            },
            local: {
              id: localId,
            },
            date
        };

        try {
            await api.post('/doacao', data)
            alert("Doação inserida com sucesso!");
            navigate('/doacoes');

        } catch (error) {
            console.error(error)
            alert("Erro na inserção da Doação");
        }

    }

    return(
        <div>
            <h3>Cadastro de Doações:</h3>

            <form onSubmit={handleNewDoacao}>
            <div>
                    <label htmlFor="pessoaId">Pessoa</label>
                    <select 
                        name="pessoaId" 
                        id="pessoaId"
                        onChange={e => setPessoaId( parseInt(e.target.value) )}>
                            <option value="0" selected>Selecione:</option>
                            {
                                pessoas.map( pessoa => (
                                    <option value={pessoa.id}>{pessoa.nome}</option>
                                ))
                            }
                    </select>
                </div>

                <div>
                    <label htmlFor="localId">Estado</label>
                    <select 
                        name="localId" 
                        id="localId"
                        onChange={e => setLocalId( parseInt(e.target.value) )}>
                            <option value="0" selected>Selecione:</option>
                            {
                                locaisColeta.map( localColeta => (
                                    <option value={localColeta.id}>{localColeta.nome}</option>
                                ))
                            }
                    </select>
                </div>
                <div>
                    <label htmlFor="date">Data</label>
                    <input 
                        type="date" 
                        name="date" 
                        id="date" 
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        />
                </div>

                <button type="submit">Cadastrar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    )
}

export default CreateDoacao