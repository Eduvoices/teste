import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';

import Recibo1 from '../components/documentos/_MOS/_testeRecibo';
import Recibo2 from '../components/documentos/_teste2Docs/_teste2Recibo';

const Recibos = (props) => {
    const [cliente, setCliente] = useState('')
    const [funcionario, setFuncionario] = useState('')
    const [valor, setValor] = useState('')
    const [doc, setDoc] = useState('')
    const [pasta, setPasta] = useState('')
    const [numeroCtrl, setNumeroCtrl] = useState('')
    const [data, setData] = useState('')
    const [textNumber, setTextNumber] = useState('')

    // function dataAtual() {
    //     let data = new Date()
    //     let day = data.getDate().toString().padStart(2, '0')
    //     let month = String(data.getMonth() + 1).padStart(2, '0')
    //     return `${day}/${month}/${data.getFullYear()}`
    // }

    function returnDoc() {
        if (doc === 'Recibo' && pasta === 'MOS') {
            return <Recibo1 cliente={cliente} cash={cash} extenso={textNumber} funcionario={funcionario} dataAtual={data} numeroCtrl={numeroCtrl}/>
        } else if (doc === 'Recibo' && pasta === 'DOS') {
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

                        // if (valor) {
                        //     setTextNumber(extenso(valor, {mode:'currency'}))
                        // }
    },[valor])

    return (
        <>
            <Button label="Print" icon="pi pi-print" onClick={() => window.print()} style={{ display: 'block', marginBottom: '20px', marginLeft: '6px' }} />

            <div>
                <div className='card'>
                    <div id="invoice-content">
                        {returnDoc()}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Recibos;
