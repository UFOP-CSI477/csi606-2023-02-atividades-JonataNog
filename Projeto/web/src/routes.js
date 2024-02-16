import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Filmes from "./pages/Filmes";
import NewFilme from "./NewFilme";
import NewLogin from "./assets/NewLogin";

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Login/>}/>
                <Route path="/new-login" exact element={<NewLogin/>}/>
                <Route path="/filmes" element={<Filmes/>}/>
                <Route path="/filme/new/:filmeId" element={<NewFilme/>}/>
            </Routes>
        </BrowserRouter>
    );
}