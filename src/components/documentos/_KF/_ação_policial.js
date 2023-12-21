import logo from '../../../assets/kflogo.png'

const CtoAçãoPolicial = ({cliente, rg, cpf, endereco, numero}) => {
    return (
        <div id="invoice-content-kf">
            <img src={logo} alt="Logo KF" style={{width:'100%'}}/>
            <h1 style={{fontSize:'20px', textAlign:'center', fontWeight:'bold', textDecorationLine:'underline'}}>CONTRATO DE PRESTAÇÃO DE SERVIÇOS ADVOCATÍCIOS</h1>

            <p>
                As partes, de um lado <b>{cliente}</b>, brasileiro(a), casado(a), aposentado(a),
                portador do RG nº <b>{rg}</b>, inscrito no CPF sob o nº <b>{cpf}</b>, residente e domiciliado na Rua <b>{endereco}</b>, nº <b>{numero}</b>, doravante denominado
                simplesmente <b>CONTRATANTE</b>
                e, de outro, lado, <b>KARINA PRESCILIA FERREIRA DOS SANTOS</b>, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 34.063.317/0001-99, com escritório
                profisional situado à Avenida Antônio Losso, nº 1499, Bairro Parque das Árvores, doravante denominado simplesmente <b>CONTRATADA</b>, firmam o presente <span style={{fontWeight:'bold', textDecorationLine:'underline'}}>CONTRATO DE HONORÁRIOS</span>, que será
                regido pelas cláusulas e condições a seguir expostas:<br/>
                <b>1ª-</b> Por este instrumento, o CONTRATANTE contrata os serviços advocatícios da CONTRATADA, para atuar na ação de Declaratória de Inconstitucionalidade
                cumulada com Rpetição de Indébito, a ser ajuizada em face do INSTITUTO PARANÁ PREVIDÊNCIA e ESTADO DO PARANÁ, que tramitará na Comarca de Guarapuava-Paraná, conforme
                termos do mandado outorgado em apartado.<br/>
                <b>2ª-</b> A medida judicial referida na cláusula primeira deverá ser ajuizada no prazo de 30 (trinta) dias, contados da entrega efetiva de todos os docmentos solicitados pela CONTRATADA.<br/>
                <b>3ª-</b> Em contraprestações pelos serviços contratados na cláusula primeira, se obriga o CONTRATANTE a pagar a CONTRATADA, os honorários de consulta em parcela única
                no importe de R4 300,00 (trezentos reais). O pagamento será realizado no ato da assinatura e entrega dos documentos. Em caso de êxito da demanda, o o CONTRATANTE obriga-se a pagar
                30% (trinta por cento) do valor da condenação auferida.<br/>
                <b>4ª-</b> Distribuída a medida judicial, o total dos honorários será devido mesmo que haja composição amigável quanto ao pedido, venha o CONTRATANTE, a desistir do pedido ou, ainda, se for cassada
                a procuração sem culpa da CONTRATADA.<br/>
                <b>5ª-</b> Na hipótese de desistência antes do ajuizamento da ação, serão devidos R$ 1.000,00 (hum mil reais).<br/>
                <b>6ª-</b> Fica o CONTRATANTE obrigado a fornecer a CONTRATADA toda documentação e informações necessárias ao fiel desempenho deste mandato de assistência jurídica, não se responsabilizando a CONTRATADA,
                por quaisquer prejuízos em face da desídia do CONTRATANTE.<br/>
                <b>7ª-</b> Havendo condenação da parte contrária ao pagamento de honorários advocatícios de sucumbência, reverterá em sua totalidade, benefício exclusivo da CONTRATADA, independentemente da remuneração prevista
                na Cláusula Terceira, desvinculado do presente contrato e isento de qualquer desconto.<br/>
                <b>8ª-</b> Ajuizada a ação, na hipótese de rescisão por parte da CONTRATADA, esta deverá notificar a sua renúncia e aguardar o prazo de 10 (dez) dias para a nomeação de novo patrono.<br/>
                <b>9ª-</b> O CONTRATANTE arcará, ainda, com todas as custas e despesas processuais, bem como com eventuais ônus de sucumbência, não respondendo a CONTRATADA por qualquer prejuízo que advenha da demora ou do não pagamento de qualquer despesa.<br/>
                <b>10ª-</b> Contatos realizados por meio de mídias sociais, tais como Whatsapp, Facebook, Messenger, Instagram, etc, fora do horário de expediente, finais de semana e/ou feriados, serão desconsiderados.
                Em caso de insistência, será cobrado o valor de hora de consulta, nos termos da OAB/PR. Serão aplicadas as mesmas medidas para ligações telefônicas e mensagens via sms.<br/>
                <b>11ª-</b> <span style={{fontWeight:'bold', textDecorationLine:'underline'}}>O CONTRATANTE declara aceitar a condição de caracterizar a presente prestação um obrigação de MEIO,</span> não obstante os diligentes serviços
                prestados objetivando êxito no litígio.<br/>
                <b>12ª-</b> Fica eleito o foro da comaca de Guarapuava, para dirimir quaisquer medidas judiciais ou extrajudiciais oriundas do presente contrato, renunciando as partes a qulquer outro, por mais privilegiado que seja.<br/>
                E, por estarem justos e contratados, assinam o prente contrato de prestação de serviços, em duas vias de igual teor e forma, sendo uma para cada parte, para que produza seus devidos efeitos legais e jurídicos.
            </p>

            <span id='assinatura'>{cliente}</span>
            <span style={{marginBottom:'48px'}}>RG {rg}</span>

            <span id='assinatura'>KF ADVOCACIA</span>
            <span>CNPJ: 34.063.317/0001-99</span>

            <div style={{width:'100%', height:'24px', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'144px'}}>
                <p>Avenida Antônio Losso, nº 1499, Parque das Árvores - Guarapuava - Paraná. Tel: (42) 3624-7409</p>
            </div>
        </div>
    )
}

export default CtoAçãoPolicial
