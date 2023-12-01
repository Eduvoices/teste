const ReciboAvalon = ({numeroCtrl, nome, dataAtual, emitente, cash, extenso}) => {
    return (
        <div>
            <h1>AVALON</h1>
            <h2>RECIBO - Avalon</h2>
            <div id="controle">
                <span>{numeroCtrl}</span>
            </div>
            <p>Recebemos de <span id="recibo_nome">{nome}</span>, a importância de <span id="recibo_valor">R$ {cash}</span> ({extenso}) referente ao pagamento de honorários adovcatícios.</p>
            <span id="data">{dataAtual}</span>
            <span id="assinatura">{emitente}</span>

            <div className="canhoto">
                <span>{dataAtual}</span>
                <span id="recibo_nome">{nome}</span>
                <span>R$ {cash}</span>
                <span>{numeroCtrl}</span>
            </div>
        </div>
    )
}

export default ReciboAvalon
