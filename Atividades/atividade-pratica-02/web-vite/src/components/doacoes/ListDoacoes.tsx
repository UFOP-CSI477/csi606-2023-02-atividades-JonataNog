import { useEffect, useState } from "react"
import api from "../../services/api"
import { Link } from "react-router-dom";
import { PessoaInterface } from "../pessoas/ListPessoas";
import { LocalColetaInterface } from "../locais-coleta/ListLocalColeta";

export interface DoacoesInterface {
    id: number;
    pessoa: PessoaInterface;
    localColeta: LocalColetaInterface;
    data: string;
    created_at: string;
    updated_at: string;
}
const ListDoacoes = () =>{
    const [doacoes, setDoacoes] = useState<DoacoesInterface[]>([]);

    useEffect(() => {
        api.get('/doacao')
            .then(response =>{
                setDoacoes(response.data);
        })

    }, []);

    const getNomePessoa= (doacao: DoacoesInterface) => {
        return doacao.pessoa ? doacao.pessoa.nome : 'Pessoa não encontrada';
      };

    const getLocalColeta = (doacao: DoacoesInterface) => {
        return doacao.localColeta ? doacao.localColeta.nome : 'Local de coleta não encontrado';
    };
      
    const handleDeletePessoa = async(id : number) => {
        if(!window.confirm("Confirma exclusão da doação?")){
            return;
        }

        try {
            await api.delete(`/doacao/${id}`);
            alert("Doação excluída com sucesso!");
            setDoacoes( doacoes.filter(doacao => doacao.id != id));
        } catch (error) {
            alert("Erro na exclusão da doação!");
            console.error(error);
        }

    }

    return(
        <div>
            <h3>Lista de Doações</h3>
            <div>
                <Link to="/doacoes/create">Inserir</Link>
            </div>
            <div>
                <Link to="/">Voltar</Link>
            </div>
            <table>

                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Pessoa</th>
                        <th>Local</th>
                        <th>Data</th>
                        <th>Criado</th>
                        <th>Alterado</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        doacoes.map(doacao => (
                            <tr>
                                <td>{doacao.id}</td>
                                <td>{getNomePessoa(doacao)}</td>
                                <td>{getLocalColeta(doacao)}</td>
                                <td>{doacao.data}</td>
                                <td>{doacao.created_at}</td>
                                <td>{doacao.updated_at}</td>
                                <td><Link to={`/doacoes/update/${doacao.id}`}>Atualizar
                                </Link></td>
                                <td><button onClick={() =>{handleDeletePessoa(doacao.id)}}>Excluir</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListDoacoes