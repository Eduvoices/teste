import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import { useEffect } from 'react';
import api from '../service/api';

export const Login = () => {
    const navigate = useNavigate();
    const [deny, setDeny] = useState(false)

    // useEffect(() => {
    //     api
    //         .post("https://tecjusbackend.vercel.app/login",{
    //             email: '',
    //             senha: '',
    //             domínio: '',
    //     })
    //         .then((response) => console.log(response))
    //         .catch((err) => {
    //         console.error("ops! ocorreu um erro" + err);
    //         });
    //     }, []);

    function performSignIn() {

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS');

        // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

        fetch('https://tecjusbackend.vercel.app/login', {
            mode: 'no-cors',
            credentials: 'include',
            method: 'POST',
            headers: headers,
            body: {
                email: '',
                senha: '',
                domínio: ''
            },
            })
            .then(response => response.json())
            .then(json => {
                console.log(json)
            })
            .catch(error => {
                console.log('Authorization failed : ' + error.message)
                setDeny(true)
            });
        }

        performSignIn()

    function handleEnter(event) {
        if (event.keyCode === 13) {
            const form = event.target.form
            const index = Array.prototype.indexOf.call(form, event.target)
            form.elements[index + 1].focus()
            event.preventDefault()
        }
    }

    return (
        <div className="login-body">
            <div className="login-panel"></div>

            <div className="login-content">
                <img src={logo} alt="babylon-layout" />

                <h1>
                    <span>Faça login</span> no TECJUS
                </h1>
                <p>Bem vindo, por favor faça login usando os campos a seguir.</p>

                <form>
                    <div className="login-input-wrapper">
                        <InputText placeholder="Usuário" onKeyDown={handleEnter}/>
                        <i className="pi pi-user"></i>
                    </div>

                    <div className="login-input-wrapper">
                        <InputText placeholder="Senha" onKeyDown={handleEnter} type='password'/>
                        <i className="pi pi-lock"></i>
                    </div>
                <Button
                    label="Entrar"
                    type='submit'
                    onClick={() => {
                        !deny ? navigate('/dashboard') : navigate('/denied');
                    }}
                />
                </form>
            </div>
        </div>
    );
};
