import logo from '../../../assets/kflogo.png'

const TermoRepresentacaoKF = ({cliente, estadoCivil, rg, cpf, endereco, numero, cep, bairro, cidade, uf, dia, mes, ano}) => {
    return (
        <div id='invoice-content-kf'>
            <img src={logo} alt="Logo KF" style={{width:'100%'}}/>
            <h1 style={{fontSize:'20px', textAlign:'center', fontWeight:'bold', textDecorationLine:'underline'}}>ANEXO</h1>
            <h2 style={{fontSize:'18px', textAlign:'center', fontWeight:'bold', textDecorationLine:'underline'}}>TERMO DE REPRESENTAÇÃO E AUTORIZAÇÃO DE ACESSO A INFORMAÇÕES PREVIDENCIÁRIAS</h2>

            <p>
            <b>{cliente}</b>, brasileiro(a), {estadoCivil}, portador(a) do RG {rg}, inscrito(a) no CPF sob n° {cpf}, residente e domiciliado na
                {endereco},  nº {numero}, CEP {cep}, Bairro {bairro}, no município de {cidade} – {uf}, nomeia e
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
            <span id='assinatura'>{cliente}</span>

        </div>
    )
}

export default TermoRepresentacaoKF
