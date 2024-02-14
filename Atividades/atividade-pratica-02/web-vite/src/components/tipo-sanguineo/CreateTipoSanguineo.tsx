import { useState } from "react"
import api from "../../services/api";
import { useNavigate } from "react-router";

const CreateTipoSanguineo = () => {
    const [ tipo, setTipo ] = useState('');
    const [ fator, setFator ] = useState('');
    const navigate = useNavigate();

    const handleNewTipoSanguineo = async (event : React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const data = {
            tipo,
            fator
          };

        try {
            await api.post('/tipo-sanguineo', data)
            alert("Tipo Sanguíneo inserido com sucesso!");
            navigate('/tiposSanguineos');

        } catch (error) {
            console.error(error)
            alert("Erro na inserção do Tipo Sanguíneo");
        }

    }


    return(
        <div>
            <h3>Cadastro de Tipos Sanguíneos: {fator} - {tipo}</h3>

            <form onSubmit={handleNewTipoSanguineo}>
                <div>
                    <label htmlFor="tipo">Tipo</label>
                    <input 
                        type="text" 
                        name="tipo" 
                        id="tipo" 
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}
                        />
                </div>

                <div>
                    <label htmlFor="fator">Fator</label>
                    <input 
                        type="text" 
                        name="fator" 
                        id="fator" 
                        value={fator}
                        onChange={e => setFator(e.target.value)}
                        />
                </div>

                <button type="submit">Cadastrar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    )
}

export default CreateTipoSanguineo