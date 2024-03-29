import React from "react"
import logo from '../../../assets/logo_mos.png'

const ReciboOSP = ({numeroCtrl, cliente, cash, extenso, funcionario, dataAtual, Texto}) => {

    let nome = decodeURIComponent(cliente)
    let funcionarioCompleto = decodeURIComponent(funcionario)
    let numeroCtrlCompleto = decodeURIComponent(numeroCtrl)
    let textoCompleto = decodeURIComponent(Texto)

    return (
        <div>
        <img src={logo} style={{width:'35%'}} alt="logo"/>
        <h1 style={{fontSize:'24px'}}>RECIBO</h1>
        <div id="controle">
            <span>{numeroCtrlCompleto}</span>
        </div>
        <p style={{marginTop:'64px'}}>Recebemos de <b><span id="recibo_nome">{nome}</span></b> a importância de <b><span id="recibo_valor">R$ {cash}</span> ({extenso})</b>, {textoCompleto}</p>
        <span id="data">{dataAtual}</span>
        <span id="assinatura">{funcionarioCompleto}</span>

        <div className="canhoto">
            <span>{dataAtual}</span>
            <span id="recibo_nome">{nome}</span>
            <span>R$ {cash}</span>
            <span>{numeroCtrlCompleto}</span>
        </div>
    </div>
    )
}

export default ReciboOSP
