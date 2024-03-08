import React from "react";
import logo from '../assets/logo.png'
import { useNavigate } from "react-router-dom";

export const Access = () => {
    const navigate = useNavigate()
    return (
        <div className="exception-body access-denied">
            <div className="exception-panel"></div>

            <div className="exception-content">
                <img src={logo} alt="imagem de fundo"/>

                <h1>
                    <span className="exception-name">ACESSO</span> NEGADO
                </h1>
                <p>Parece que você não possui as permissões necessárias</p>
                <button onClick={()=>navigate('/login')} id='button_a'>Retornar à tela de login</button>
            </div>
        </div>
    )
}

export default Access
