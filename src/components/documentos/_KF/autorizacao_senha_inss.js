import logo from '../../../assets/kflogo.png'

const AutorizacaoSenhaInss = ({cliente, estadoCivil, profissao, rg, cpf, endereco, numero, dia, mes, ano}) => {

    let nome = decodeURIComponent(cliente)
    let address = decodeURIComponent(endereco)

    return (
        <div id="invoice-content-kf">
            <img src={logo} alt="Logo KF" style={{width:'100%'}}/>
            <h1 style={{fontSize:'20px', textAlign:'center', fontWeight:'bold', textDecorationLine:'underline'}}>TERMO DE CONSENTIMENTO PARA USO DA SENHA DO “MEU INSS” E DE RESPONSABILIDADE PELOS DANOS CAUSADOS COM A ALTERAÇÃO DESTA</h1>

            <p><b>{nome}</b>, brasileiro(a), <b>{estadoCivil}</b>, <b>{profissao}</b>, portador do RG: <b>{rg}</b>, inscrito no CPF: <b>{cpf}</b>, residente e domiciliado na Rua <b>{address}</b>, nº <b>{numero}</b>. <br/>
            Pelo presente, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), venho pelo presente autorizar a utilização de senha no sistema MEU INSS, ao profissional contratado o acesso aos dados e serviços disponibilizados pelo INSS para o bom desempenho dos serviços da advocacia previdenciária. <br/>
            Declaro estar ciente de que a senha é pessoal e intransferível, sendo de minha responsabilidade o uso, guarda e sigilo. <br/>
            Cumpro o compromisso de comunicar, com maior brevidade possível o escritório sobre qualquer alteração da referida senha, devendo ser comunicada pelo e-mail secretaria@kfprev.adv.br ou pelo Whatsapp 42-99814-5963.
            O descumprimento dos termos acordados poderá interferir na qualidade do trabalho, eximindo o profissional de quaisquer danos pela ausência de conhecimento sobre a nova senha elaborada pelo contratante.
            </p>

            <span id='data'>Guarapuava, {dia} de {mes} de {ano}.</span>

            <span id='assinatura'>{nome}</span>
            <span>RG {rg}</span>

            <div style={{width:'100%', height:'24px', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'144px'}}>
                <p>Avenida Antônio Losso, nº 1499, Parque das Árvores - Guarapuava - Paraná. Tel: (42) 3624-7409</p>
            </div>
        </div>
    )
}

export default AutorizacaoSenhaInss
