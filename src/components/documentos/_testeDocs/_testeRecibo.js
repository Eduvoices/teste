import React from "react"
import logo from '../../../assets/logo.png'

const Recibo1 = ({numeroCtrl, nome, cash, extenso, emitente, dataAtual, sobrenome}) => {
    return (
        <div>
        <img src={logo} alt="logo"/>
        <h1>RECIBO</h1>
        <div id="controle">
            <span>{numeroCtrl}</span>
        </div>
        <p>Recebemos de <span id="recibo_nome">{nome} {sobrenome}</span> a importância de <span id="recibo_valor">R$ {cash}</span> ({extenso} reais), referente ao pagamento de honorários advocatícios.</p>
        <span id="data">{dataAtual}</span>
        <span id="assinatura">{emitente} {sobrenome}</span>

        <div className="canhoto">
            <span>{dataAtual}</span>
            <span id="recibo_nome">{nome} {sobrenome}</span>
            <span>R$ {cash}</span>
            <span>{numeroCtrl}</span>
        </div>
    </div>
    )
}

export default Recibo1
