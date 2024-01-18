import React from "react"
import logo1 from '../../../assets/logo_mos.png'

const Recibo1 = ({numeroCtrl, cliente, cash, extenso, funcionario, dataAtual}) => {

    let nome = decodeURIComponent(cliente)
    let dataAtualCompleta = decodeURIComponent(dataAtual)
    let funcionarioCompleto = decodeURIComponent(funcionario)
    let numeroCtrlCompleto = decodeURIComponent(numeroCtrl)

    return (
        <div>
        <img src={logo1} alt="logo"/>
        <h1 style={{fontSize:'24px'}}>RECIBO</h1>
        <div id="controle">
            <span>{numeroCtrlCompleto}</span>
        </div>
        <p style={{marginTop:'64px'}}>Recebemos de <b><span id="recibo_nome">{nome}</span></b> a importância de <b><span id="recibo_valor">R$ {cash}</span> ({extenso})</b>, referente ao pagamento de honorários advocatícios.</p>
        <span id="data">{dataAtualCompleta}</span>
        <span id="assinatura">{funcionarioCompleto}</span>

        <div className="canhoto">
            <span>{dataAtualCompleta}</span>
            <span id="recibo_nome">{nome}</span>
            <span>R$ {cash}</span>
            <span>{numeroCtrlCompleto}</span>
        </div>
    </div>
    )
}

export default Recibo1
