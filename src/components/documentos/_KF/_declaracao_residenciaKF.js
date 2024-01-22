import logo from '../../../assets/kflogo.png'

const DeclaracaoResidenciaKF = ({cliente, estadoCivil, rg, cpf, endereco, numero, cep, bairro, cidade, uf, dia, mes, ano}) => {

    let nome = decodeURIComponent(cliente)
    let address = decodeURIComponent(endereco)
    let bairroCompleto = decodeURIComponent(bairro)

    return (
        <div id="invoice-content-kf">
            <img src={logo} alt="Logo KF" style={{width:'100%'}}/>
            <h1 style={{fontSize:'20px', textAlign:'center', fontWeight:'bold', textDecoration:'underline'}}>Declaração de Residência</h1>

            <p>
                <b>{nome}</b>, brasileiro(a), {estadoCivil}, portador do RG nº {rg}, inscrito no CPF sob o nº {cpf}, residente
                e domiciliado na rua {address}, nº {numero}, CEP {cep}, Bairro {bairroCompleto}, no município de {cidade} - {uf}, declaro
                na forma prevista pelo art. 1º da Lei 7.115/1983, sob as penas previstas no art. 299 do Código Penal ("Omitir, em documento
                público ou particular, declaração que deve ou devia constar, ou nele inserir ou fazer inserir declaração falsa ou diversa da que
                devia ser escrita, com fim de prejudicar direito, criar obrigação ou alterar a verdade sobre fato juridicamente relevante.
                Pena - Reclusão - 1 a 5 anos, e multa."), para fins de fazer prova junto ao Juizado Especial Federal de Guarapuava, que mantenho
                residência e domicílio no endereço acima indicado.
            </p>
            <p>Por ser verdade, firmo esta declaração sob as penas da lei.</p>
            <span id='data'>Guarapuava, {dia} de {mes} de {ano}.</span>
            <span id='assinatura'>{nome}</span>

            <div style={{width:'100%', height:'24px', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'144px'}}>
                <p>Avenida Antônio Losso, nº 1499, Parque das Árvores - Guarapuava - Paraná. Tel (42) 3624-7409</p>
            </div>
        </div>
    )
}

export default DeclaracaoResidenciaKF
