import logo from '../../../assets/kflogo.png'

const Recibo2 = ({numeroCtrl, cliente, dataAtual, funcionario, cash, extenso}) => {
    return (
        <div id='invoice-content-kf'>
            <img src={logo} alt='logo' style={{width: '100%'}}/>
            <h1>RECIBO</h1>
            <div id='controle'>
                <span>{numeroCtrl}</span>
            </div>
            <p>Recebemos de <span id='recibo_nome'>{cliente}</span>, a importância de <span id='recibo_valor'>R$ {cash}</span> ({extenso}) referente ao pagamento de honorários advocatícios</p>
            <span id='data'>{dataAtual}</span>
            <span id='assinatura'>{funcionario}</span>

            <div className='canhoto'>
                <span>{dataAtual}</span>
                <span id='recibo_nome'>{cliente}</span>
                <span>R$ {cash}</span>
                <span>{numeroCtrl}</span>
            </div>
            <div style={{width:'100%', height:'24px', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'144px'}}>
                <p>Avenida Antônio Losso, nª 1499, Parque das Árvores - Guarapuava - Paraná. Tel (42) 3624-7409</p>
            </div>
        </div>
        )
}

export default Recibo2
