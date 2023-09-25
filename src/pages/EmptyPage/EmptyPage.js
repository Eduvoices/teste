import React from 'react';
import { useState } from "react"
import logo from '../../assets/flags/teste.png'

import './styles.css'

const EmptyPage = () => {
    const [nome, setNome] = useState('')
    const [emitente, setEmitente] = useState('')
    const [valor, setValor] = useState('')
    const [extenso, setExtenso] = useState('')
    const [numeroCtrl, setNumeroCtrl] = useState('')


    function dataAtual() {
        let data = new Date()
        let day = data.getDate().toString().padStart(2, '0')
        let month = String(data.getMonth() + 1).padStart(2, '0')
        return `${day}/${month}/${data.getFullYear()}`
    }

    const cash = parseFloat(valor).toLocaleString('pt-br', {minimumFractionDigits: 2})


    function onClick() {
        window.print()
    }

    return (

        <>
            <div className="dados">
            <h1>Recibos</h1>
                Nome emitente: <br />
                <input
                type="text"
                name="" id="emitente"
                onChange={(e)=> setEmitente(e.target.value)}
                />
                <br /> <br />

                Número de controle: <br />
                <input type="text" name="" id="ctrlNumber" onChange={(e)=>setNumeroCtrl(e.target.value)}/> <br /> <br />

                Recebemos de: <br />
                <input type="text" name="" id="nome" onChange={(e)=> setNome(e.target.value)}/> <br /> <br />

                Valor: R$ <br />
                <input type="number" name="" id="valor" step='0.01' onChange={(e)=>setValor(e.target.value)}/> <br /> <br />

                Valor por extenso (opcional): <br />
                <input type="text" name="" id="extenso" onChange={(e)=>setExtenso(e.target.value)} /> <br /> <br />

                <button onClick={onClick}>Gerar recibo</button>
            </div>

            <div className='print'>
                <div>
                    <img src={logo} alt=""/>
                    <h1>RECIBO</h1>
                    <div id="controle">
                        <span>{numeroCtrl}</span>
                    </div>
                    <p>Recebemos de <span id="recibo_nome">{nome}</span> a importância de <span id="recibo_valor">R$ {cash}</span> ({extenso}), referente ao pagamento de honorários advocatícios.</p>
                    <span id="data">{dataAtual()}</span>
                    <span id="assinatura">{emitente}</span>

                    <div className="canhoto">
                        <span>{dataAtual()}</span>
                        <span id="recibo_nome">{nome}</span>
                        <span>R$ {cash}</span>
                        <span>{numeroCtrl}</span>
                    </div>
                </div>
            </div>
        </>
    )
    ;
};

export default EmptyPage;
