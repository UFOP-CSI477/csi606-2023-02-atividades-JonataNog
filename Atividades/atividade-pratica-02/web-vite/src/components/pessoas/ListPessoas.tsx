import { useEffect, useState } from "react"
import api from "../../services/api"
import { Link } from "react-router-dom";
import { CidadeInterface } from "../cidades/ListCidades";
import { TipoSanguineoInterface } from "../tipo-sanguineo/ListTipoSanguineo";

export interface PessoaInterface {
    id: number;
    nome: string;
    rua: string;
    numero: string;
    complemento: string;
    rg: string;
    cidade: CidadeInterface;
    tipoSanguineo: TipoSanguineoInterface;
    created_at: string;
    updated_at: string;
}
const ListPessoas = () =>{
    const [pessoas, setPessoas] = useState<PessoaInterface[]>([]);

    useEffect(() => {
        api.get('/pessoas')
            .then(response =>{
                setPessoas(response.data);
        })

    }, []);

    const getNomeCidade = (pessoa: PessoaInterface) => {
        return pessoa.cidade ? pessoa.cidade.nome : 'Cidade não encontrado';
      };

      const getTipo = (pessoa: PessoaInterface) => {
        return pessoa.tipoSanguineo ? pessoa.tipoSanguineo.tipo : 'Tipo Sanguíneo não encontrado';
      };
      
    const handleDeletePessoa = async(id : number) => {
        if(!window.confirm("Confirma exclusão da pessoa?")){
            return;
        }

        try {
            await api.delete(`/pessoas/${id}`);
            alert("Pessoa excluída com sucesso!");
            setPessoas( pessoas.filter(pessoa => pessoa.id != id));
        } catch (error) {
            alert("Erro na exclusão da pessoa!");
            console.error(error);
        }

    }

    return(
        <div>
            <h3>Lista de Pessoas</h3>
            <div>
                <Link to="/pessoas/create">Inserir</Link>
            </div>
            <div>
                <Link to="/">Voltar</Link>
            </div>
            <table>

                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Rua</th>
                        <th>Numero</th>
                        <th>Complemento</th>
                        <th>RG</th>
                        <th>Cidade</th>
                        <th>Tipo</th>
                        <th>Criado</th>
                        <th>Alterado</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        pessoas.map(pessoa => (
                            <tr>
                                <td>{pessoa.id}</td>
                                <td>{pessoa.nome}</td>
                                <td>{pessoa.rua}</td>
                                <td>{pessoa.numero}</td>
                                <td>{pessoa.complemento}</td>
                                <td>{pessoa.rg}</td>
                                <td>{getNomeCidade(pessoa)}</td>
                                <td>{getTipo(pessoa)}</td>
                                <td>{pessoa.created_at}</td>
                                <td>{pessoa.updated_at}</td>
                                <td><Link to={`/pessoas/update/${pessoa.id}`}>Atualizar
                                </Link></td>
                                <td><button onClick={() =>{handleDeletePessoa(pessoa.id)}}>Excluir</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListPessoas