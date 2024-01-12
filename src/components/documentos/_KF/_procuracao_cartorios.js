import logo from '../../../assets/kflogo.png'

const ProcuracaoCartoriosKF = ({cliente, estadoCivil, rg, cpf, endereco, numero, cep, bairro, cidade, uf, dia, mes, ano}) => {

    let nome = decodeURIComponent(cliente)
    let address = decodeURIComponent(endereco)

    return (
        <div id="invoice-content-kf">
            <img src={logo} alt="Logo KF" style={{width:'100%'}}/>
            <h1 style={{fontSize:'20px', textAlign:'center', fontWeight:'bold', textDecoration:'underline'}}>PROCURAÇÃO</h1>

            <p>
            <b>{nome}</b>, brasileiro(a), {estadoCivil}, portador do RG nº {rg}, inscrito no CPF sob o nº {cpf}, residente
                e domiciliado na rua {address}, nº {numero}, CEP {cep}, Bairro {bairro}, no município de {cidade} - {uf}, nomeia e
                constitui como sua procuradora, através do presente instrumento de mandato, aos advogados, <b>KARINA PRESCILIA FERREIRA DOS
                SANTOS</b>, brasileira, inscrita perante a OAB/PR sob o n. 64.685, NIT nº 12971702539,<b> EDGAR SANTOS DE MEIRA NETO</b>, brasileiro, inscrito
                perante a OAB/PR sob o n. 86.080, <b>ISABELA CANTERI DO AMARAL</b>, brasileira, inscrita perante a OAB/PR sob o n. 97.636, residentes e domiciliados
                em Guarapuava – PR, ambos integrantes da sociedade de advogados <b>KARINA PRESCILIA FERREIRA DOS SANTOS</b>, pessoa jurídica de direito
                privado, inscrita na OAB/PR sob nº 9.006 e no CNPJ 34.063.317/0001-99, com endereço profissional à Avenida Antonio Losso, nº 1499, Parque das
                Árvores, na mesma cidade, telefone (42) 3624-7409, à qual confere amplos, gerais e ilimitados poderes, inclusive os constantes da cláusula ad
                judicia, para defender os interesses e direitos do outorgante, judicial ou administrativa, podendo propor e contestar ações, agravar decisões,
                requerer extratos e informações do beneficio, acompanhando-as até final, transigir, variar, desistir, fazer acordos, receber e dar quitação,
                requerer extrato e informação de benefício junto ao INSS e cartórios do foro extrajudicial, em especial para requerer certidões de nascimento
                e casamento dos parentes colaterais, ascendentes e descendentes, a fim de instruir processo previdenciário junto ao INSS e Justiça
                Federal, requerer o que convier e substabelecer em especial para <b>AÇÃO DE CONCESSÃO DE BENEFÍCIO PREVIDENCIÁRIO</b>, acompanhando-o até seus
                ulteriores fins, realizando todos e quaisquer atos que se façam necessários.
            </p>

            <span id='data'>Guarapuava, {dia} de {mes} de {ano}.</span>
            <span id='assinatura'>{nome}</span>

            <div style={{width:'100%', height:'24px', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'144px'}}>
                <p>Avenida Antônio Losso, nº 1499, Parque das Árvores - Guarapuava - Paraná. Tel (42) 3624-7409</p>
            </div>
        </div>
    )
}

export default ProcuracaoCartoriosKF
