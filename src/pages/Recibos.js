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
import ProcuracaoPolicial from '../components/documentos/_KF/_procuracao_policial';
import TermoRenunciaKF from '../components/documentos/_KF/_termo_renunciaKF';
import TermoRepresentacaoKF from '../components/documentos/_KF/_termo_representacao_autorizacaoKF';

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

        // let data = new Date()
        // let day = data.getDate().toString().padStart(2, '0')
        // let month = String(data.getMonth() + 1).padStart(2, '0')
        // let monthName = String(data.toLocaleString('pt-br', {
        //     month:'long'}))

    function returnDoc() {
        if (doc === 'Recibo' && pasta === 'MOS') {
            return <Recibo1
                cliente={param2}
                cash={param1}
                extenso={textNumber}
                funcionario={param4}
                dataAtual={param3}
                numeroCtrl={param5}
                Texto={param6}
                />
        } else if (doc === 'Recibo' && pasta === 'KF') {
            return <Recibo2
                cliente={param2}
                cash={param1}
                extenso={textNumber}
                funcionario={param4}
                dataAtual={param3}
                numeroCtrl={param5}
                Texto={param6}/>
        } else if (doc === 'procuracao' && pasta === 'KF') {
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
                cash={param1}
                extenso={textNumber}
                funcionario={param4}
                dataAtual={param3}
                numeroCtrl={param5}
                Texto={param6}/>
        } else if (doc === 'senha_inss' && pasta === 'KF') {
            return <AutorizacaoSenhaInss
                cliente={param1}
                estadoCivil={param2}
                profissao={param3}
                rg={param4}
                cpf={param5}
                endereco={param6}
                numero={param7}/>
        } else if (doc === 'cto_acao_policial' && pasta === 'KF') {
            return <CtoAçãoPolicial
                cliente={param1}
                rg={param2}
                cpf={param3}
                endereco={param4}
                numero={param5}/>
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
            return <DeclaracaoResidenciaKF
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
        } else if (doc === 'procuracao_cartorio' && pasta === 'KF') {
            return <ProcuracaoCartoriosKF
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
        } else if (doc === 'procuracao_policial' && pasta === 'KF') {
            return <ProcuracaoPolicial
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
        } else if (doc === 'termo_renuncia' && pasta === 'KF') {
            return <TermoRenunciaKF
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
        } else if (doc === 'termo_representacao' && pasta === 'KF') {
            return <TermoRepresentacaoKF
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

    // function dataAtual() {
    //     let data = new Date()
    //     let day = data.getDate().toString().padStart(2, '0')
    //     let month = String(data.getMonth() + 1).padStart(2, '0')
    //     let monthName = data.toLocaleString('pt-br', {
    //         month:'long'
    //     })
    //     return `${day}/${month}/${data.getFullYear()}`
    // }

    //http://localhost:3000/#/invoice?#MOS#Recibo#100#Joaquim%20José%20da%20Silva%20Xavier#07/12/2023#Funcionario1#202312
    // http://localhost:3000/#/invoice?#KF#cto_honorarios#Joaquim%20José%20da%20Silva%20Xavier#casado#480035465#47491614035#Curió%20do%20Bico%20Doce#500#Centro#86060000#Arapongas#PR#12#dezembro#2023

    useEffect(()=>{

                        var url = window.location.href
                        var res = url.split('?')

                        let params = res[1].split('#')
                        setPasta(params[1])
                        setDoc(params[2])
                        setParam1(params[3])
                        setParam2(params[4])
                        setParam3(params[5])
                        setParam4(params[6])
                        setParam5(params[7])
                        setParam6(params[8])
                        setParam7(params[9])
                        setParam8(params[10])
                        setParam9(params[11])
                        setParam10(params[12])
                        setParam11(params[13])
                        setParam12(params[14])
                        setParam13(params[15])

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
                            {returnDoc()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recibos;
