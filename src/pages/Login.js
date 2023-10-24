import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
// import { useEffect } from 'react';
// import api from '../service/api';

export const Login = () => {
    const navigate = useNavigate();
    // const [deny, setDeny] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

//     useEffect(()=>{
//         let headers = new Headers();

//         headers.append('Content-Type', 'application/json');
//         headers.append('Accept', 'application/json');

//         headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
//         headers.append('Access-Control-Allow-Credentials', 'true');

//         headers.append('GET', 'POST', 'OPTIONS');


//          fetch('https://tecjusbackend.vercel.app/login', {
// method: 'POST',
// body: JSON.stringify({
//    email: 'title',
//    senha: 'body',
//    domínio: ''
// }),
// headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'Access-Control-Allow-Origin': 'http://localhost:3000',
// }
// })
// .then((response) => response.json())
// .then((data) => {
//    console.log(data)
// })
// .catch((err) => {
//    console.log(err.message);
// })
//     },[])

    function performSignIn() {

//         let headers = new Headers();

//         headers.append('Content-Type', 'application/json');
//         headers.append('Accept', 'application/json');

//         headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
//         headers.append('Access-Control-Allow-Credentials', 'true');

//         headers.append('GET', 'POST', 'OPTIONS');


//          fetch('https://tecjusbackend.vercel.app/login', {
// method: 'POST',
// mode: 'no-cors',
// body: JSON.stringify({
//    email: 'title',
//    senha: 'body',
//    domínio: ''
// }),
// headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'Access-Control-Allow-Origin': 'http://localhost:3000',
//     'Access-Control-Allow-Credentials': 'true'
// }
// })
// .then((response) => response.json())
// .then((data) => {
//    console.log(data)
// })
// .catch((err) => {
//    console.log(err.message);
// })
        }

        performSignIn()

    // async function login() {
    //     console.log(email, password)
    //     let item = {email, password}

    //     let result = await fetch('https://tecjusbackend.vercel.app/login', {
    //         method: 'POST',
    //         mode: 'no-cors',
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             'Access-Control-Allow-Origin': 'http://localhost:3000',
    //             'Access-Control-Allow-Credentials': 'true'
    //         },
    //         body: JSON.stringify(item)
    //     })
    //     result = result.json()
    //     console.log(result)
    // }


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
                        <InputText placeholder="Usuário" onKeyDown={handleEnter} onChange={(e)=> setEmail(e.target.value)}/>
                        <i className="pi pi-user"></i>
                    </div>

                    <div className="login-input-wrapper">
                        <InputText placeholder="Senha" onKeyDown={handleEnter} type='password' onChange={(e)=> setPassword(e.target.value)}/>
                        <i className="pi pi-lock"></i>
                    </div>
                <Button
                    label="Entrar"
                    type='submit'
                    // onClick={() => {
                    //     deny ? navigate('/dashboard') : navigate('/denied');
                    // }}
                    onClick={()=> navigate('/dashboard')}
                />
                </form>
            </div>
        </div>
    );
}
