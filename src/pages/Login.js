import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import axios from 'axios';

export const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        senha: '',
        subdomínio: 'TECJUS'
    })

// useEffect(()=>{
//         let headers = new Headers();

//         headers.append('Content-Type', 'application/json');
//         headers.append('Accept', 'application/json');

//         headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
//         headers.append('Access-Control-Allow-Credentials', 'true');

//         headers.append('GET', 'POST', 'OPTIONS');


//         fetch('https://tecjusbackend.vercel.app/login', {
//         method: 'POST',
//         mode: 'no-cors',
//         body: JSON.stringify({
//             email: email,
//             senha: password,
//             subdomínio: 'TECJUS'
//         }),
//         headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'Access-Control-Allow-Origin': 'http://localhost:3000',
//     }
//     })
//     .then((data) => {
//     console.log(data.status)
//     setResponse(data.status)
//     console.log(response)
//     })
//     .catch((err) => {
//     console.log(err.message);
//     })

// },[response, email, password])

// const access = async (email, password) => {
//     await fetch('https://tecjusbackend.vercel.app/login', {
//         method: 'POST',
//         mode: 'no-cors',
//         body: JSON.stringify({
//             email: email,
//             senha: password,
//             subdomínio: 'TECJUS'
//         }),
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             'Access-Control-Allow-Origin': 'http://localhost:3000',
//             'Origin': 'http://localhost:3000'
//         }
//     })
//     .then((data) => {
//         console.log('Status:', data.status)
//         console.log('Status Text:', data.statusText)
//         console.log('Type:', data.type)
//         console.log('Ok:', data.ok)
//         console.log('Redirected:', data.redirected)
//         console.log('URL:', data.url)
//     })
//     .catch((err) => {
//         console.log(err.message)
//         setError(err.message)
//         console.log(error)
//     })
// }

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

    // const handleForm = async (e) => {
    //     e.preventDefault()
    //     const response = await fetch(`https://tecjusbackend.vercel.app/login`, {
    //         method: 'POST',
    //         mode: 'cors',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(formData)
    //     })
    //     console.log(response)
    //     console.log(response.data)
    // }

    const baseUrl = 'https://tecjusbackend.vercel.app/login'

    function handleForm(e) {
        e.preventDefault()
        axios.post(baseUrl, {
            email: formData.email,
            senha: formData.senha,
            subdomínio: formData.subdomínio
        }).then((response) => console.log(response.data))
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

                <form onSubmit={handleForm}>
                    <div className="login-input-wrapper">
                        <InputText placeholder="Usuário" value={formData.email} onKeyDown={handleEnter} onChange={(e)=>handleFormEdit(e, 'email')}/>
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
