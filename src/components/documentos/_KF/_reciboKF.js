import logo from '../../../assets/kflogo.png'

const Recibo2 = ({numeroCtrl, cliente, dataAtual, funcionario, cash, extenso}) => {

    let nome = decodeURIComponent(cliente)
    let dataAtualCompleta = decodeURIComponent(dataAtual)
    let funcionarioCompleto = decodeURIComponent(funcionario)
    let numeroCtrlCompleto = decodeURIComponent(numeroCtrl)

    return (
        <div id='invoice-content-kf'>
            <img src={logo} alt='logo' style={{width: '100%'}}/>
            <h1 style={{fontSize:'24px'}}>RECIBO</h1>
            <div id='controle'>
                <span>{numeroCtrlCompleto}</span>
            </div>
            <p style={{marginTop:'96px'}}>Recebemos de <b><span id='recibo_nome'>{nome}</span></b>, a importância de <b><span id='recibo_valor'>R$ {cash}</span> ({extenso})</b> referente ao pagamento de honorários advocatícios</p>
            <span id='data'>{dataAtualCompleta}</span>
            <span id='assinatura'>{funcionarioCompleto}</span>

            <div className='canhoto'>
                <span>{dataAtualCompleta}</span>
                <span id='recibo_nome'>{nome}</span>
                <span>R$ {cash}</span>
                <span>{numeroCtrlCompleto}</span>
            </div>
            <div  style={{width:'100%', height:'24px', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'32px'}}>
                <p style={{fontSize:'16px'}}>Avenida Antônio Losso, nª 1499, Parque das Árvores - Guarapuava - Paraná. Tel (42) 3624-7409</p>
            </div>
        </div>
        )
}

export default Recibo2
