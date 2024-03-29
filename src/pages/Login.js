import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
// import CryptoJS from 'crypto-js';

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
            } else if (data.message === 'Acesso liberado') {
                navigate('/dashboard')
            }
        }
    }

    //priscilablasechi@yahoo.com.br 12345

    // let secretEmailPhrase = 'icc;my{lZAKIR:3z|w3JIxe5}5>rG#??'
    // let secretPasswordPhrase = 'ue{hJNPSEOG{3+!i.D^SPXbmm9RRnXHf'

    // let encryptEmail = CryptoJS.AES.encrypt(formData.email, secretEmailPhrase)
    // let decryptEmail = CryptoJS.AES.decrypt(encryptEmail, secretEmailPhrase)

    // let encryptPassword = CryptoJS.AES.encrypt(formData.senha, secretPasswordPhrase)
    // let decryptPassword = CryptoJS.AES.decrypt(encryptPassword, secretPasswordPhrase)

    // let emailPlainText = decryptEmail.toString(CryptoJS.enc.Utf8)
    // let senha = decryptPassword.toString(CryptoJS.enc.Utf8)

    // console.log('Esse é o email encriptado:', encryptEmail.toString())
    // console.log('Esse é o email decriptado:', emailPlainText)

    // console.log('Essa é a senha ecriptada:', encryptPassword.toString())
    // console.log('Essa é a senha decriptada:', senha)


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
                />
                </form>
            </div>
        </div>
    );
}
