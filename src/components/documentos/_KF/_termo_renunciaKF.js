import logo from '../../../assets/kflogo.png'

const TermoRenunciaKF = ({cliente, estadoCivil, rg, cpf, endereco, numero, bairro, cep, cidade, uf, dia, mes, ano}) => {

    let nome = decodeURIComponent(cliente)
    let address = decodeURIComponent(endereco)

    return (
        <div id='invoice-content-kf'>
            <img src={logo} alt='Logo KF' style={{width:'100%'}}/>
            <h1 style={{fontSize:'20px', textAlign:'center', fontWeight:'bold', textDecorationLine:'underline'}}>Termo de Renúncia</h1>

            <p>
                <b>{nome}</b>, brasileiro(a), {estadoCivil}, portador(a) do RG nº {rg}, inscrito(a) no CPF sob o nº {cpf}, residente
                e domiciliado(a) na Rua {address}, nº {numero}, bairro {bairro}, CEP {cep}, no município de {cidade} - {uf}, <b>RENUNCIA</b> aos
                valores que porventura venham a exceder 60 (sessenta) salários mínimos, de acordo com o disposto no artigo 3º da
                Lei 10.259/2001, requerendo sejam deferidos direitos equivalentes ao limite financeiro estabelecido no mesmo dispositivo
                legal, aferido no momento da propositura da ação, no processo de Benfício Previdenciário em face do INSS, junto ao Juizado
                Especial Federal de Guarapuava.
            </p>

            <span id='data'>Guarapuava, {dia} de {mes} de {ano}.</span>
            <span id='assinatura'>{nome}</span>

            <div style={{width:'100%', height:'24px', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'144px'}}>
                <p>Avenida Antônio Losso, nº 1499, Parque das Árvores - Guarapuava - Paraná. Tel (42) 3624-7409</p>
            </div>
        </div>
    )
}

export default TermoRenunciaKF
