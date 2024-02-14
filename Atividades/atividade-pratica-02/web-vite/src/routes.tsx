import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "./App"
import ListEstados from "./components/estados/ListEstados";
import CreateEstado from "./components/estados/CreateEstados";
import UpdateEstado from "./components/estados/UpdateEstado";
import CreateCidade from "./components/cidades/CreateCidade";
import ListCidades from "./components/cidades/ListCidades";
import UpdateCidade from "./components/cidades/UpdateCidade";
import ListLocalColeta from "./components/locais-coleta/ListLocalColeta";
import CreateLocalColeta from "./components/locais-coleta/CreateLocalColeta";
import UpdateLocalColeta from "./components/locais-coleta/UpdateLocalColeta";
import ListTipoSanguineo from "./components/tipo-sanguineo/ListTipoSanguineo";
import CreateTipoSanguineo from "./components/tipo-sanguineo/CreateTipoSanguineo";
import UpdateTipoSanguineo from "./components/tipo-sanguineo/UpdateTipoSanguineo";
import ListPessoas from "./components/pessoas/ListPessoas";
import CreatePessoa from "./components/pessoas/CreatePessoa";
import UpdatePessoa from "./components/pessoas/UpdatePessoa";
import ListDoacoes from "./components/doacoes/ListDoacoes";
import CreateDoacao from "./components/doacoes/CreateDoacao";
import UpdateDoacao from "./components/doacoes/UpdateDoacao";

const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/estados" element={<ListEstados/>}/>
                <Route path="/estados/create" element={<CreateEstado/>}/>
                <Route path="/estados/update/:id" element={<UpdateEstado/>}/>

                <Route path="/cidades" element={<ListCidades/>}/>
                <Route path="/cidades/create" element={<CreateCidade/>}/>
                <Route path="/cidades/update/:id" element={<UpdateCidade/>}/>

                <Route path="/locaisColeta" element={<ListLocalColeta/>}/>
                <Route path="/locaisColeta/create" element={<CreateLocalColeta/>}/>
                <Route path="/locaisColeta/update/:id" element={<UpdateLocalColeta/>}/>

                <Route path="/tiposSanguineos" element={<ListTipoSanguineo/>}/>
                <Route path="/tiposSanguineos/create" element={<CreateTipoSanguineo/>}/>
                <Route path="/tiposSanguineos/update/:id" element={<UpdateTipoSanguineo/>}/>

                <Route path="/pessoas" element={<ListPessoas/>}/>
                <Route path="/pessoas/create" element={<CreatePessoa/>}/>
                <Route path="/pessoas/update/:id" element={<UpdatePessoa/>}/>

                <Route path="/doacoes" element={<ListDoacoes/>}/>
                <Route path="/doacoes/create" element={<CreateDoacao/>}/>
                <Route path="/doacoes/update/:id" element={<UpdateDoacao/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;