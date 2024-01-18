import logo from '../../../assets/logo.png'

const ReciboTecjus = ({numeroCtrl, dataAtual, cash, extenso, funcionario, cliente, Texto}) => {

    let nomeCompleto = decodeURIComponent(cliente)
    let dataAtualCompleta = decodeURIComponent(dataAtual)
    let funcionarioCompleto = decodeURIComponent(funcionario)
    let numeroCtrlCompleto = decodeURIComponent(numeroCtrl)
    let textoCompleto = decodeURIComponent(Texto)

    return (
        <div>
            <img src={logo} alt="logo" style={{width:'50%'}}/>

            <h1 style={{fontSize:'24px'}}>RECIBO</h1>

            <div id="controle">
                <span>{numeroCtrlCompleto}</span>
            </div>
            <p style={{marginTop:'64px'}}>Recebemos de <span id="recibo_nome"><b>{nomeCompleto}</b></span> a importância de <b><span id="recibo_valor">R$ {cash}</span> ({extenso}</b>), {textoCompleto}</p>
            <span id="data">{dataAtualCompleta}</span>
            <span id="assinatura">{funcionarioCompleto}</span>

            <div className="canhoto">
                <span>{dataAtualCompleta}</span>
                <span id="recibo_nome">{nomeCompleto}</span>
                <span>R$ {cash}</span>
                <span>{numeroCtrlCompleto}</span>
            </div>
        </div>
    )
}

export default ReciboTecjus
