import React from "react"
import logo1 from '../../../assets/logo_mos.png'

const Recibo1 = ({numeroCtrl, cliente, cash, extenso, funcionario, dataAtual}) => {

    return (
        <div>
        <img src={logo1} alt="logo"/>
        <h1>RECIBO</h1>
        <div id="controle">
            <span>{numeroCtrl}</span>
        </div>
        <p>Recebemos de <span id="recibo_nome">{cliente}</span> a importância de <span id="recibo_valor">R$ {cash}</span> ({extenso}), referente ao pagamento de honorários advocatícios.</p>
        <span id="data">{dataAtual}</span>
        <span id="assinatura">{funcionario}</span>

        <div className="canhoto">
            <span>{dataAtual}</span>
            <span id="recibo_nome">{cliente}</span>
            <span>R$ {cash}</span>
            <span>{numeroCtrl}</span>
        </div>
    </div>
    )
}

export default Recibo1
