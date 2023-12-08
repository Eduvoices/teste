import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';

import Recibo1 from '../components/documentos/_MOS/_reciboMOS';
import Recibo2 from '../components/documentos/_KF/_reciboKF';

const Recibos = (props) => {
    const [cliente, setCliente] = useState('')
    const [funcionario, setFuncionario] = useState('')
    const [valor, setValor] = useState('')
    const [doc, setDoc] = useState('')
    const [pasta, setPasta] = useState('')
    const [numeroCtrl, setNumeroCtrl] = useState('')
    const [data, setData] = useState('')
    const [textNumber, setTextNumber] = useState('')

    function returnDoc() {
        if (doc === 'Recibo' && pasta === 'MOS') {
            return <Recibo1 cliente={cliente} cash={cash} extenso={textNumber} funcionario={funcionario} dataAtual={data} numeroCtrl={numeroCtrl}/>
        } else if (doc === 'Recibo' && pasta === 'KF') {
            return <Recibo2 cliente={cliente} cash={cash} extenso={textNumber} funcionario={funcionario} dataAtual={data} numeroCtrl={numeroCtrl}/>
        }
    }


    const cash = parseFloat(valor).toLocaleString('pt-br', {minimumFractionDigits: 2})

    useEffect(()=>{

                        var url = window.location.href
                        var res = url.split('?')

                        let teste = decodeURIComponent(res[1])
                        let teste2 = teste.split(' ')
                        setPasta(teste2[1])
                        setDoc(teste2[2])
                        setValor(teste2[3])
                        setCliente(teste2[4])
                        setData(teste2[5])
                        setFuncionario(teste2[6])
                        setNumeroCtrl(teste2[7])

                        const extenso = require('extenso')

                        if (valor) {
                            setTextNumber(extenso(valor, {mode:'currency'}))
                        }
    },[valor])

    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div style={{width:'960px'}}>
                <Button label="Imprimir" icon="pi pi-print" onClick={() => window.print()} style={{ display: 'block', marginBottom: '20px', marginLeft: '6px', marginTop:'24px' }} />

                <div>
                    <div className='card'>
                        <div id="invoice-content">
                            {/* {returnDoc()} */}
                            <Recibo2 cliente={cliente} cash={cash} extenso={textNumber} funcionario={funcionario} dataAtual={data} numeroCtrl={numeroCtrl}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recibos;
