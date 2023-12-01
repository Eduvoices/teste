const ProcuraçãoRoma = ({outorgante, dataAtual}) => {
    return (
        <div>
            <h1>ROMA</h1>
            <h2>Procuração</h2>
            <p>
                Outorgante: Eu, {outorgante}, [nacionalidade], [estado civil], [profissão], portador do CPF número ____________ e do RG número __________, residente e domiciliado na em [endereço], pelo presente instrumento, nomeio e constituo, como meu procurador <br />
                Outorgado: [nome], [nacionalidade], [estado civi], [profissão], portador do CPF número ____________ e do RG número __________, residente e domiciliado em [endereço], com poderes para representar o outorgante junto ao [órgão ou instituição] para [motivo da procuração informado da forma mais detalhada possível], responsabilizando-me por todos os atos praticados no cumprimento deste instrumento, cessando seus efeitos [esclarecer a validade da procuração].
            </p>
            <span id="data">{dataAtual}</span>
            <span id="assinatura">{outorgante}</span>
        </div>
    )
}

export default ProcuraçãoRoma
