import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'

export const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="login-body">
            <div className="login-panel"></div>

            <div className="login-content">
                <img src={logo} alt="babylon-layout" />

                <h1>
                    <span>Faça login</span> no TECJUS
                </h1>
                <p>Bem vindo, por favor faça login usando os campos a seguir.</p>

                <div className="login-input-wrapper">
                    <InputText placeholder="Usuário" />
                    <i className="pi pi-user"></i>
                </div>

                <div className="login-input-wrapper">
                    <InputText placeholder="Senha" />
                    <i className="pi pi-lock"></i>
                </div>

                <Button
                    label="Entrar"
                    onClick={() => {
                        navigate('/dashboard');
                    }}
                />
            </div>
        </div>
    );
};
