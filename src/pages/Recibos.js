import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';

import Recibo1 from '../components/documentos/_MOS/_reciboMOS';
import Recibo2 from '../components/documentos/_KF/_reciboKF';
import Procuração2 from '../components/documentos/_KF/_procuracaoKF';
import ReciboTecjus from '../components/documentos/_TECJUS/_reciboTecjus';
import AutorizacaoSenhaInss from '../components/documentos/_KF/autorizacao_senha_inss';
import CtoAçãoPolicial from '../components/documentos/_KF/_ação_policial';
import CtoTrabalhistaCivel from '../components/documentos/_KF/cto_trabalhista_civel';
import CtoHonorariosKF from '../components/documentos/_KF/_cto_honorariosKF';
import DeclaracaoHipossuficiencia from '../components/documentos/_KF/_declaracao_hipossuficienciaKF';
import DeclaracaoResidenciaKF from '../components/documentos/_KF/_declaracao_residenciaKF';
import ProcuracaoCartoriosKF from '../components/documentos/_KF/_procuracao_cartorios';

const Recibos = (props) => {
    const [param1, setParam1] = useState('')
    const [param2, setParam2] = useState('')
    const [param3, setParam3] = useState('')
    const [param4, setParam4] = useState('')
    const [param5, setParam5] = useState('')
    const [param6, setParam6] = useState('')
    const [param7, setParam7] = useState('')
    const [param8, setParam8] = useState('')
    const [param9, setParam9] = useState('')
    const [param10, setParam10] = useState('')
    const [param11, setParam11] = useState('')
    const [param12, setParam12] = useState('')
    const [param13, setParam13] = useState('')

    const [doc, setDoc] = useState('')
    const [pasta, setPasta] = useState('')
    const [textNumber, setTextNumber] = useState('')

    function returnDoc() {
        if (doc === 'Recibo' && pasta === 'MOS') {
            return <Recibo1
                    cliente={param2}
                    cash={cash}
                    extenso={textNumber}
                    funcionario={param4}
                    dataAtual={param3}
                    numeroCtrl={param5}/>
        } else if (doc === 'Recibo' && pasta === 'KF') {
            return <Recibo2
                    cliente={param2}
                    cash={cash}
                    extenso={textNumber}
                    funcionario={param4}
                    dataAtual={param3}
                    numeroCtrl={param5}/>
        } else if (doc === 'Procuração' && pasta === 'KF') {
            return <Procuração2
                    cliente={param1}
                    estadoCivil={param2}
                    rg={param3}
                    cpf={param4}
                    endereço={param5}
                    numero={param6}
                    bairro={param7}
                    cep={param8}
                    cidade={param9}
                    uf={param10}
                    dia={param11}
                    mes={param12}
                    ano={param13}
                    />
        } else if (doc === 'Recibo' && pasta === 'TECJUS') {
            return <ReciboTecjus
                    cliente={param2}
                    extenso={textNumber}
                    cash={cash}
                    funcionario={param4}
                    dataAtual={param3}
                    numeroCtrl={param5}/>
        } else if (doc === 'senha_inss' && pasta === 'KF') {
            return <AutorizacaoSenhaInss
                    cliente={param1}
                    estadoCivil={param2}
                    profissao={param3}
                    rg={param4}
                    cpf={param5}
                    endereco={param6}
                    numero={param7}/>
        } else if (doc === 'cto_açao_policial' && pasta === 'KF') {
            return <CtoAçãoPolicial
                    cliente={param1}
                    rg={param2}
                    cpf={param3}
                    endereco={param4}
                    numero={param4}/>
        } else if (doc === 'cto_civel_trabalhista' && pasta === 'KF') {
            return <CtoTrabalhistaCivel
                            cliente={param1}
                            estadoCivil={param2}
                            rg={param3}
                            cpf={param4}
                            endereco={param5}
                            numero={param6}
                            bairro={param7}
                            cep={param8}
                            cidade={param9}
                            uf={param10}
                            dia={param11}
                            mes={param12}
                            ano={param13}/>
        } else if (doc === 'declaracao_hipossuficiencia' && pasta === 'KF') {
            return <DeclaracaoHipossuficiencia
                            cliente={param1}
                            estadoCivil={param2}
                            rg={param3}
                            cpf={param4}
                            endereco={param5}
                            numero={param6}
                            bairro={param7}
                            cep={param8}
                            cidade={param9}
                            uf={param10}
                            dia={param11}
                            mes={param12}
                            ano={param13}/>
        } else if (doc === 'cto_honorarios' && pasta === 'KF') {
            return <CtoHonorariosKF
                            cliente={param1}
                            estadoCivil={param2}
                            rg={param3}
                            cpf={param4}
                            endereco={param5}
                            numero={param6}
                            bairro={param7}
                            cep={param8}
                            cidade={param9}
                            uf={param10}
                            dia={param11}
                            mes={param12}
                            ano={param13}/>
        } else if (doc === 'declaracao_hipossuficiencia' && pasta === 'KF') {
            return <DeclaracaoHipossuficiencia
            cliente={param1}
            estadoCivil={param2}
            rg={param3}
            cpf={param4}
            endereco={param5}
            numero={param6}
            bairro={param7}
            cep={param8}
            cidade={param9}
            uf={param10}
            dia={param11}
            mes={param12}
            ano={param13}/>
        } else if (doc === 'declaracao_residencia' && pasta === 'KF') {
            <DeclaracaoResidenciaKF
            cliente={param1}
            estadoCivil={param2}
            rg={param3}
            cpf={param4}
            endereco={param5}
            numero={param6}
            bairro={param7}
            cep={param8}
            cidade={param9}
            uf={param10}
            dia={param11}
            mes={param12}
            ano={param13}/>
        }
    }

    // http://localhost:3000/#/invoice?%20TECJUS%20Recibo%20100%20Cliente1%2007/12/2023%20Funcionario1%20202312
    // http://localhost:3000/#/invoice?%20KF%20Procura%C3%A7%C3%A3o%20Cliente1%20casado%20480035465%2047491614035%20Condor%20500%20Centro%2086060000%20Arapongas%20PR%2012%20dezembro%202023
    // http://localhost:3000/#/invoice?%20KF%20senha_inss%20Cliente1%20casado%20123456789%2098765432100%20Condor%20247
    // http://localhost:3000/#/invoice?%20KF%20cto_açao_policial%20Cliente1%20123456789%2098765432100%20Condor%20247
    // http://localhost:3000/#/invoice?%20KF%20cto_civel_trabalhista%20Cliente1%20casado%20480035465%2047491614035%20Condor%20500%20Centro%2086060000%20Arapongas%20PR%2012%20dezembro%202023
    // http://localhost:3000/#/invoice?%20KF%20cto_honorarios%20Cliente1%20casado%20480035465%2047491614035%20Condor%20500%20Centro%2086060000%20Arapongas%20PR%2012%20dezembro%202023
    // http://localhost:3000/#/invoice?%20KF%20declaracao_hipossuficiencia%20Cliente1%20casado%20480035465%2047491614035%20Condor%20500%20Centro%2086060000%20Arapongas%20PR%2012%20dezembro%202023
    // http://localhost:3000/#/invoice?%20KF%20declaracao_residencia%20Cliente1%20casado%20480035465%2047491614035%20Condor%20500%20Centro%2086060000%20Arapongas%20PR%2012%20dezembro%202023
    // http://localhost:3000/#/invoice?%20KF%20procuracao_cartorio%20Cliente1%20casado%20480035465%2047491614035%20Condor%20500%20Centro%2086060000%20Arapongas%20PR%2012%20dezembro%202023


    const cash = parseFloat(param1).toLocaleString('pt-br', {minimumFractionDigits: 2})

    useEffect(()=>{

                        var url = window.location.href
                        var res = url.split('?')

                        let teste = decodeURIComponent(res[1])
                        let teste2 = teste.split(' ')
                        setPasta(teste2[1])
                        setDoc(teste2[2])
                        setParam1(teste2[3])
                        setParam2(teste2[4])
                        setParam3(teste2[5])
                        setParam4(teste2[6])
                        setParam5(teste2[7])
                        setParam6(teste2[8])
                        setParam7(teste2[9])
                        setParam8(teste2[10])
                        setParam9(teste2[11])
                        setParam10(teste2[12])
                        setParam11(teste2[13])
                        setParam12(teste2[14])
                        setParam13(teste2[15])

                        const extenso = require('extenso')

                        if (doc === 'Recibo') {
                            setTextNumber(extenso(param1, {mode:'currency'}))
                        }
    },[param1, doc])

    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div style={{width:'960px'}}>
                <Button label="Imprimir" icon="pi pi-print" onClick={() => window.print()} style={{ display: 'block', marginBottom: '20px', marginLeft: '6px', marginTop:'24px' }} />

                <div>
                    <div className='card'>
                        <div id="invoice-content">
                            {/* {returnDoc()} */}
                            <ProcuracaoCartoriosKF
                                cliente={param1}
                                estadoCivil={param2}
                                rg={param3}
                                cpf={param4}
                                endereco={param5}
                                numero={param6}
                                bairro={param7}
                                cep={param8}
                                cidade={param9}
                                uf={param10}
                                dia={param11}
                                mes={param12}
                                ano={param13}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recibos;
