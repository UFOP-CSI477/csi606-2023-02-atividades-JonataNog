import { Link } from "react-router-dom";

const Menu = () => {
    return(
        <div>
            <h2>Aplicação de Controle de Doação de Sangue</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/estados">Estados</Link></li>
                <li><Link to ="/cidades">Cidades</Link></li>
                <li><Link to ="/locaisColeta">Locais Coleta</Link></li>
                <li><Link to ="/tiposSanguineos">Tipo Sanguíneo</Link></li>
                <li><Link to ="/pessoas">Pessoas</Link></li>
                <li><Link to ="/doacoes">Doações</Link></li>
            </ul>
        </div>
    );
}

export default Menu