import React from "react"
import logo1 from '../../../assets/logo.png'
import logo2 from '../../../assets/logo-black-alt.png'

const Recibo1 = ({numeroCtrl, nome, cash, extenso, emitente, dataAtual, sobrenome, logo}) => {
    const imgLogo = () => {
        if (logo === 'tecjus') {
            return logo1
        } else if (logo === 'babylon') {
            return logo2
        }
    }

    return (
        <div>
        <img src={imgLogo()} alt="logo"/>
        <h1>RECIBO</h1>
        <div id="controle">
            <span>{numeroCtrl}</span>
        </div>
        <p>Recebemos de <span id="recibo_nome">{nome} {sobrenome}</span> a importância de <span id="recibo_valor">R$ {cash}</span> ({extenso} reais), referente ao pagamento de honorários advocatícios.</p>
        <span id="data">{dataAtual}</span>
        <span id="assinatura">{emitente}</span>

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
