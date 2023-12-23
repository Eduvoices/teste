import logo from '../../../assets/kflogo.png'

const DeclaracaoHipossuficiencia = ({cliente, estadoCivil, rg, cpf, endereco, numero, cep, bairro, cidade, uf, dia, mes, ano}) => {
    return (
        <div id="invoice-content-kf">
            <img src={logo} alt="Logo KF" style={{width:'100%'}}/>
            <h1 style={{fontSize:'20px', textAlign:'center', fontWeight:'bold', textDecorationLine:'underline'}}>DECLARAÇÃO DE IMPOSSIBILIDADE FINANCEIRA</h1>

            <p>
            <b>{cliente}</b>, brasileiro(a), {estadoCivil}, portador(a) do RG {rg}, inscrito(a) no CPF sob n° {cpf}, residente e domiciliado na
            {endereco},  nº {numero}, CEP {cep}, Bairro {bairro}, no município de {cidade} – {uf}, DECLARA, nos termos dos artigos 98 e 99, do
            Código de Processo Civil não possuir recursos para pagar as custas, as despesas processuais e os honorários advocatícios do presente feito.<br/>
            Desta forma, solicito que me seja concedido o benefício da Justiça Gratuita, nos termos do artigo 98 e seguintes do Código de Processo Civil.<br/>
            Sinceramente,
            </p>

            <span id='data'>Guarapuava, {dia} de {mes} de {ano}.</span>

            <span id='assinatura'>{cliente}</span>

            <div style={{width:'100%', height:'24px', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'144px'}}>
                <p>Avenida Antônio Losso, nº 1499, Parque das Árvores - Guarapuava - Paraná. Tel: (42) 3624-7409</p>
            </div>

        </div>
    )
}

export default DeclaracaoHipossuficiencia
