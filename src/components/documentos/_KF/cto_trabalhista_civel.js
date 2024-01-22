import logo from '../../../assets/kflogo.png'

const CtoTrabalhistaCivel = ({cliente, estadoCivil, rg, cpf, endereco, numero, bairro, cep, cidade, uf, dia, mes, ano}) => {

    let nome = decodeURIComponent(cliente)
    let address = decodeURIComponent(endereco)
    let bairroCompleto = decodeURIComponent(bairro)

    return (
        <div id="invoice-content-kf">
            <img src={logo} alt="Logo KF" style={{width:'100%'}}/>
            <h1 style={{fontSize:'20px', textAlign:'center', fontWeight:'bold', textDecorationLine:'underline'}}>CONTRATO DE HONORÁRIOS ADVOCATÍCIOS</h1>

            <p>
                <b>CONTRATANTE: {nome}</b>, brasileiro(a), {estadoCivil}, portadora do RG nº {rg}, inscrita
                no CPF sob n° {cpf}, residente e domiciliada na Rua {address}, nº {numero}, Bairro {bairroCompleto}, CEP {cep},
                no município de {cidade}- {uf}.<br/>
                <b>CONTRATADA: Dra. Karina Prescilia Ferreira dos Santos</b>, brasileira, casada, inscrita na OAB/PR
                sob nº 64.685, com escritório profissional situado à Avenida Antônio Losso, nº 1499,
                CEP: 85.055-310, Guarapuava-Paraná. <br/>
                <b>CLÁUSULA PRIMEIRA:</b> A advogada contratada obriga-se, face ao mandato judicial que lhe foi outorgado, a
                prestar seu serviço profissional na defesa dos interesses do contratante em <b>AÇÃO DE RECLAMATÓRIA TRABALHISTA</b>, até o final do processo.<br/>
                <b>CLÁUSULA SEGUNDA:</b> Em remuneração desses serviços advocatícios, a advogada contratada receberá, somente se ganhar
                o processo, 30% (trinta por cento) dos valores que ganhar a título da ação supramencionada. O outorgante concorda
                que seja destacado o valor a advogada a título de honorários contratado, <b>declarando nesse ato que não adiantou
                nenhum valor a advogada a título de honorários, tampouco adiantará no decorrer do processo</b>, por convenção de que a advogada
                só receberá pelo seu trabalho caso tenha êxito na presente demanda, ficando assim acordado que em caso de
                desistência da ação caberá a CONTRATADA, além do percentual equivalente ao trabalho já realizado, o valor de dois
                salários mínimos a título de multa contratual. No caso de acordo realizado no decorrer do processo a porcentagem
                contratada será devidamente igualmente à advogada. Tal contrato não é de risco, uma vez que a natureza é de
                prestação de serviço é de meio, não de resultado e em contraprestação, assim o
                contratante somente terá obrigação de remunerar a contratada em caso de êxito, conforme acima mencionado.<br/>
                <b>CLÁUSULA TERCEIRA</b>: DA AUTORIZAÇÃO: O CONTRATANTE autoriza à CONTRATADA a enviar correspondência, no endereço
                informado, com objetivo de manter informado sobre questões relacionadas ao direito e cidadania, sem nenhum
                custo adicional.  Se por ventura, existir a necessidade de despesas de deslocamento, tal despesa com o
                deslocamento da advogada e das partes inclusive as testemunhas, fica por conta da Contratante.<br/>
                <b>CLAÚSULA QUARTA</b>: Ficará por conta do contratante a localização de toda documentação necessária para instrução do processo.<br/>
                <b>CLAUSULA QUINTA</b>: A veracidade e dos documentos apresentados à contratada são de única e exclusiva responsabilidade do contratante.<br/>
                E para firmeza e como prova de assim haverem contratado, fizeram este instrumento particular, impresso em
                duas vias de igual teor e forma, assinado pelas partes contratantes, escritas somente no anverso, elegendo
                o Foro da Comarca onde tramitar o pedido e assinarem o presente instrumento.
            </p>

            <span id='data'>Guarapuava, {dia} de {mes} de {ano}.</span>

            <span id='assinatura'>{nome}</span>
            <span style={{marginBottom:'48px'}}>RG {rg}</span>

            <span id='assinatura'>KF ADVOCACIA</span>
            <span>CNPJ: 34.063.317/0001-99</span>

            <div style={{width:'100%', height:'24px', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'144px'}}>
                <p>Avenida Antônio Losso, nº 1499, Parque das Árvores - Guarapuava - Paraná. Tel: (42) 3624-7409</p>
            </div>
        </div>
    )
}

export default CtoTrabalhistaCivel
