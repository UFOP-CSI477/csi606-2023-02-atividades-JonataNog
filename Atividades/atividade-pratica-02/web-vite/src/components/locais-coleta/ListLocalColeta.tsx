import { useEffect, useState } from "react"
import api from "../../services/api"
import { Link } from "react-router-dom";
import { CidadeInterface } from "../cidades/ListCidades";

export interface LocalColetaInterface {
    id: number;
    nome: string;
    rua: string;
    numero: string;
    complemento: string;
    cidade: CidadeInterface;
    created_at: string;
    updated_at: string;
}
const ListLocalColeta = () =>{
    const [localColeta, setLocalColeta] = useState<LocalColetaInterface[]>([]);

    useEffect(() => {
        api.get('/local-coleta')
            .then(response =>{
                setLocalColeta(response.data);
        })

    }, []);

    const getNomeCidade = (localColeta: LocalColetaInterface) => {
        return localColeta.cidade ? localColeta.cidade.nome : 'Cidade não encontrado';
      };
      
    const handleDeleteLocalColeta = async(id : number) => {
        if(!window.confirm("Confirma exclusão do local de coleta?")){
            return;
        }

        try {
            await api.delete(`/local-coleta/${id}`);
            alert("Cidade excluída com sucesso!");
            setLocalColeta( localColeta.filter(localColeta => localColeta.id != id));
        } catch (error) {
            alert("Erro na exclusão do local de coleta!");
            console.error(error);
        }

    }

    return(
        <div>
            <h3>Lista de Locais de Coleta</h3>
            <div>
                <Link to="/locaisColeta/create">Inserir</Link>
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
                        <th>Cidade</th>
                        <th>Criado</th>
                        <th>Alterado</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        localColeta.map(localColeta => (
                            <tr>
                                <td>{localColeta.id}</td>
                                <td>{localColeta.nome}</td>
                                <td>{localColeta.rua}</td>
                                <td>{localColeta.numero}</td>
                                <td>{localColeta.complemento}</td>
                                <td>{getNomeCidade(localColeta)}</td>
                                <td>{localColeta.created_at}</td>
                                <td>{localColeta.updated_at}</td>
                                <td><Link to={`/locaisColeta/update/${localColeta.id}`}>Atualizar
                                </Link></td>
                                <td><button onClick={() =>{handleDeleteLocalColeta(localColeta.id)}}>Excluir</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListLocalColeta