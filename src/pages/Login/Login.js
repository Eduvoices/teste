import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/flags/teste.png'

import './styles.css'

export const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    function handleEnter(e) {
        if (e.keyCode === 13) {
            const input = e.target.form
            const i = Array.prototype.indexOf.call(input, e.target)
            input.elements[i + 1].focus()
            e.preventDefault()
        }
    }

    return (
        <div className="container">
        <div className="container-login">
            <div className="wrapper">
            <form className="login-form">

                <div id='central-img'>
                    <img src={logo} alt="Logo do sistema"/>
                </div>

                <div className='wrap-input'>
                <input
                type='email'
                value={user}
                onChange={e => setUser(e.target.value)}
                onKeyDown={handleEnter}
                />
                <span className='focus-input' data-placeholder='E-mail'></span>
                </div>

                <div className='wrap-input'>
                <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={handleEnter}
                />
                <span className='focus-input' data-placeholder='Senha'></span>
                </div>

                <div className='remember'>
                    <input type='checkbox' id='remember'/>
                    <label htmlFor='remember'>Lembrar e-mail</label>
                </div>

                <div className='container-login-form-btn'>
                <button className='login-form-btn' type='submit' onClick={()=> navigate('/')}>Entrar</button>
                </div>

            </form>
            </div>
        </div>
        </div>
    );
};
