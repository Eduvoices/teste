import logo from '../../assets/logo-black-alt.png'

const Recibo2 = ({numeroCtrl, nome, dataAtual, emitente, cash, extenso}) => {
    return (
        <div>
            <img src={logo} alt='logo'/>
            <h1>RECIBO ALTERNATIVO - TESTE</h1>
            <div id='controle'>
                <span>{numeroCtrl}</span>
            </div>
            <p>Recebmos de <span id='recibo_nome'>{nome}</span>, a importância de <span id='recibo_valor'>R$ {cash}</span> {extenso} referente ao pagamento de honorários adovcatícionss</p>
            <span id='data'>{dataAtual}</span>
            <span id='assinatura'>{emitente}</span>

            <div className='canhoto'>
                <span>{dataAtual}</span>
                <span id='recibo_nome'>{nome}</span>
                <span>R$ {cash}</span>
                <span>{numeroCtrl}</span>
            </div>
        </div>
        )
}

export default Recibo2
