import logo from '../../../assets/kflogo.png'

const TermoRepresentacaoKF = ({cliente, estadoCivil, rg, cpf, endereco, numero, cep, bairro, cidade, uf, dia, mes, ano}) => {

    let nome = decodeURIComponent(cliente)
    let address = decodeURIComponent(endereco)
    let bairroCompleto = decodeURIComponent(bairro)

    return (
        <div id='invoice-content-kf'>
            <img src={logo} alt="Logo KF" style={{width:'100%'}}/>
            <h1 style={{fontSize:'20px', textAlign:'center', fontWeight:'bold', textDecorationLine:'underline'}}>ANEXO</h1>
            <h2 style={{fontSize:'18px', textAlign:'center', fontWeight:'bold', textDecorationLine:'underline'}}>TERMO DE REPRESENTAÇÃO E AUTORIZAÇÃO DE ACESSO A INFORMAÇÕES PREVIDENCIÁRIAS</h2>

            <p>
            <b>{nome}</b>, brasileiro(a), {estadoCivil}, portador(a) do RG {rg}, inscrito(a) no CPF sob n° {cpf}, residente e domiciliado na Rua {address},  nº
                {numero}, CEP {cep}, Bairro {bairroCompleto}, no município de {cidade} – {uf}, nomeia e
                constitui como sua procuradora, através do presente instrumento de mandato, aos advogados, <b>KARINA PRESCILIA FERREIRA DOS
                SANTOS</b>, brasileira, inscrita perante a OAB/PR sob o n. 64.685, NIT nº 12971702539,<b> EDGAR SANTOS DE MEIRA NETO</b>, brasileiro, inscrito
                perante a OAB/PR sob o n. 86.080, <b>ISABELA CANTERI DO AMARAL</b>, brasileira, inscrita perante a OAB/PR sob o n. 97.636, CONFIRO PODERES
                ESPECÍFICOS para me representar perante o INSS na solicitação do serviço ou benefício abaixo indicado e AUTORIZO o referido procurador a ter
                acesso apenas às informações pessoais necessárias a subsidiar o requerimento eletrônico do serviço ou benefício abaixo elencado: <br />
                <div id='seletor'>
                    I - (    ) Aposentadoria por Idade (  ) rural (  ) urbana <br />
                    II - (    ) Aposentadoria por Tempo de Contribuição <br />
                    III -	(    ) Pensão por Morte Previdenciária  (   ) rural (   ) urbana <br />
                    IV -	(    ) Auxílio-Reclusão (   ) rural  (    ) urbano <br />
                    V -	(    ) Salário Maternidade  (   ) rural  (   ) urbano <br />
                    VI -	(    ) Cópia de processos <br />
                    VII -	(    ) Recurso à JRPS
                </div>
                <br />
                Podendo, para tanto, praticar os atos necessários ao cumprimento deste mandato, em especial, prestar informações, acompanhar
                requerimentos, cumprir exigências, ter vistas e tomar ciência de decisões sobre processos de requerimento de benefícios operacionalizados
                pelo Instituto.
            </p>

            <span id='data'>Guarapuava, {dia} de {mes} de {ano}.</span>
            <span id='assinatura'>{nome}</span>

            <h2 style={{fontSize:'18px', textAlign:'center', fontWeight:'bold', textDecorationLine:'underline', marginTop:'96px'}}>TERMO DE RESPONSABILIDADE</h2>

            <p>
                Por este Termo de Responsabilidade, comprometo-me a comunicar ao INSS qualquer evento que possa anular esta
                Procuração, no prazo de trinta dias, a contar da data que o mesmo ocorra, principalmente o óbito do segurado/pensionista, mediante
                apresentação da respectiva certidão. <br/>
                Estou ciente de que o descumprimento do compromisso ora assumido, além de obrigar a devolução de importâncias recebidas indevidamente, quando
                for o caso, sujeitar-me-á às penalidades previstas nos arts. 171 e 299, ambos do Código Penal.
            </p>

            <span id='data'>Guarapuava, {dia} de {mes} de {ano}.</span>
            <span id='assinatura'>Procurador</span>

            <h3 style={{fontSize:'14px', textAlign:'center', fontWeight:'bold', marginTop:'96px'}}>CÓDIGO PENAL</h3>
            <p style={{fontSize:'14px'}}>
            <i>
            Art. 171. Obter, para si ou para outrem, vantagem ilícita, em prejuízo alheio, induzindo ou manter alguém em erro, mediante artifício, ardil ou
            qualquer outro meio fraudulento <br/>
            Art. 299. Omitir, em documento público ou particular, declaração que devia constar, ou nele inserir ou fazer inserir declaração falsa ou diversa
            da que devia ser escrita, com o fim de prejudicar direito, criar, obrigação ou alterar a verdade sobre fato juridicamente relevante.
            </i>
            </p>

            <div style={{width:'100%', height:'24px', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'144px'}}>
                <p>Avenida Antônio Losso, nº 1499, Parque das Árvores - Guarapuava - Paraná. Tel (42) 3624-7409</p>
            </div>
        </div>
    )
}

export default TermoRepresentacaoKF
