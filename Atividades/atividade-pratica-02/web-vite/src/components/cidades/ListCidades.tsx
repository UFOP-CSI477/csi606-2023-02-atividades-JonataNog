import { useEffect, useState } from "react"
import api from "../../services/api"
import { Link } from "react-router-dom";
import { EstadoInterface } from "../estados/ListEstados";

export interface CidadeInterface {
    id: number;
    nome: string;
    estado: EstadoInterface;
    created_at: string;
    updated_at: string;
}
const ListCidades = () =>{
    const [cidades, setCidades] = useState<CidadeInterface[]>([]);

    useEffect(() => {
        api.get('/cidades')
            .then(response =>{
                setCidades(response.data);
        })

    }, []);

    const getNomeEstado = (cidade: CidadeInterface) => {
        return cidade.estado ? cidade.estado.nome : 'Estado não encontrado';
      };
      
    const handleDeleteEstado = async(id : number) => {
        if(!window.confirm("Confirma exclusão da cidade?")){
            return;
        }

        try {
            await api.delete(`/cidades/${id}`);
            alert("Cidade excluída com sucesso!");
            setCidades( cidades.filter(cidade => cidade.id != id));
        } catch (error) {
            alert("Erro na exclusão da cidade!");
            console.error(error);
        }

    }

    return(
        <div>
            <h3>Lista de cidades</h3>
            <div>
                <Link to="/cidades/create">Inserir</Link>
            </div>
            <div>
                <Link to="/">Voltar</Link>
            </div>
            <table>

                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Estado</th>
                        <th>Criado</th>
                        <th>Alterado</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        cidades.map(cidade => (
                            <tr>
                                <td>{cidade.id}</td>
                                <td>{cidade.nome}</td>
                                <td>{getNomeEstado(cidade)}</td>
                                <td>{cidade.created_at}</td>
                                <td>{cidade.updated_at}</td>
                                <td><Link to={`/cidades/update/${cidade.id}`}>Atualizar
                                </Link></td>
                                <td><button onClick={() =>{handleDeleteEstado(cidade.id)}}>Excluir</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListCidades