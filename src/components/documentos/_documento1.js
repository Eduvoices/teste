import logo from '../../assets/logo.png'

const Procuração = ({dataAtual, outorgante}) => {
    return (
        <div>
            <img src={logo} alt="logo"/>
            <h1>PROCURAÇÃO</h1>
                <p>
                Outorgante: Eu, [nome], [nacionalidade], [estado civil], [profissão], portador do CPF número ____________ e do RG número ____________, residente e domiciliado em [endereço], pelo presente instrumento, nomeio e constituo, como meu procurador <br />
                Outorgado: [nome], [nacionalidade], [estado civil], [profissão], portador do CPF número ____________ e do RG número ____________, residente e domiciliado em [endereço], com poderes para representar o outorgante junto ao [órgão ou instituição perante a qual o ato será realizado] para [motivo da procuração informado da forma mais detalhada possível], responsabilizando-me por todos os atos praticados no cumprimento deste instrumento, cessando seus efeitos [esclarecer validade da procuração].
                </p>
                <span id='data'>{dataAtual}</span>
                <span id='assinatura'>{outorgante}</span>
        </div>
    )
}

export default Procuração
