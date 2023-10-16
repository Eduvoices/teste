import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import { useEffect } from 'react';
import api from '../service/api';

export const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        api
            .post("https://tecjusbackend.vercel.app/login",{
                email: '',
                senha: '',
                domínio: ''
        })
            .then((response) => console.log(response))
            .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            });
        }, []);

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
