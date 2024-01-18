import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import CryptoJS from 'crypto-js';

export const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        senha: '',
        subdomínio: 'TECJUS'
    })

    function handleEnter(event) {
        if (event.keyCode === 13) {
            const form = event.target.form
            const index = Array.prototype.indexOf.call(form, event.target)
            form.elements[index + 1].focus()
            event.preventDefault()
        }
    }

    const handleFormEdit = (event, name) => {
        setFormData({...formData, [name]: event.target.value})
    }

    const handleForm = async (e) => {
        e.preventDefault()
        if (formData.email && formData.senha) {
            const response = await fetch(`https://tecjusbackend.vercel.app/login`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            console.log(data.message)

            if (data.message === 'Primeiro acesso') {
                navigate('/firstAccess')
            } else if (data.message === 'Acesso negado') {
                navigate('/denied')
            }
        }
    }

    let message = 'Essa é uma mensagem secreta'
    let secretPhrase = 'aLiThsanGthn119450Jemnt'

    let encrypt = CryptoJS.AES.encrypt(formData.email, secretPhrase)
    let decrypt = CryptoJS.AES.decrypt(encrypt, secretPhrase)

    let plainText = decrypt.toString(CryptoJS.enc.Utf8)

    console.log(encrypt.toString())
    console.log(plainText)

    //4567

    return (
        <div className="login-body">
            <div className="login-panel"></div>

            <div className="login-content">
                <img src={logo} alt="babylon-layout" />

                <h1>
                    <span>Faça login</span> no TECJUS
                </h1>
                <p>Bem vindo, por favor faça login usando os campos a seguir.</p>

                <form onSubmit={handleForm}>
                    <div className="login-input-wrapper">
                        <InputText placeholder="Usuário" onKeyDown={handleEnter} onChange={(e)=>handleFormEdit(e, 'email')}/>
                        <i className="pi pi-user"></i>
                    </div>

                    <div className="login-input-wrapper">
                        <InputText placeholder="Senha" onKeyDown={handleEnter} type='password' onChange={(e)=>handleFormEdit(e, 'senha')}/>
                        <i className="pi pi-lock"></i>
                    </div>
                <Button
                    label="Entrar"
                    type='submit'
                    // onClick={()=> navigate('/dashboard')}
                />
                </form>
            </div>
        </div>
    );
}
