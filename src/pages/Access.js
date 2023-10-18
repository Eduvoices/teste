import React from "react";
import logo from '../assets/logo.png'

export const Access = () => {
    return (
        <div className="exception-body access-denied">
            <div className="exception-panel"></div>

            <div className="exception-content">
                <img src={logo} alt="imagem de fundo"/>

                <h1>
                    <span className="exception-name">ACESSO</span> NEGADO
                </h1>
                <p>Parece que você não possui as permissões necessárias</p>
                <a href="/">Retornar à tela de login</a>
            </div>
        </div>
    )
}

export default Access
