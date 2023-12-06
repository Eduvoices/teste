import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { Dropdown } from 'primereact/dropdown';

import Recibo1 from '../components/documentos/_testeDocs/_testeRecibo';
import Recibo2 from '../components/documentos/_teste2Docs/_teste2Recibo';
// import Procuração from '../components/documentos/_testeDocs/_testeProcuração';
// import Procuração2 from '../components/documentos/_teste2Docs/_teste2Procuração';
// import ReciboAvalon from '../components/documentos/_teste4Docs/_testeRecibo4';
// import Procuração4 from '../components/documentos/_teste4Docs/_testeProcuração4';
// import ReciboRoma from '../components/documentos/_testeRecibo3.js/_teste3Recibo';
// import ProcuraçãoRoma from '../components/documentos/_testeRecibo3.js/_testeProcuração3';

const Recibos = (props) => {
    const [cliente, setCliente] = useState('')
    const [funcionario, setFuncionario] = useState('')
    const [valor, setValor] = useState('')
    const [extenso, setExtenso] = useState('')
    const [doc, setDoc] = useState('')
    const [pasta, setPasta] = useState('')
    const [numeroCtrl, setNumeroCtrl] = useState('')

    function dataAtual() {
        let data = new Date()
        let day = data.getDate().toString().padStart(2, '0')
        let month = String(data.getMonth() + 1).padStart(2, '0')
        return `${day}/${month}/${data.getFullYear()}`
    }

    // const dropdownValues = [
    //     {name: 'Recibo'},
    //     {name: 'Procuração'},
    // ]

    // const dropdownEscritorios = [
    //     {name: 'Escritório 1'},
    //     {name: 'Escritório 2'},
    //     {name: 'Escritório 3'},
    //     {name: 'Escritório 4'}
    // ]

    // function handleInputChange(e) {
    //     e.preventDefault()
    //     const {value} = e.target
    //     setDoc(value)
    // }

    // function handleOfficeChange(e) {
    //     e.preventDefault()
    //     const {value} = e.target
    //     setParam(value)
    // }

    function returnDoc() {
        if (doc === 'Recibo' && pasta === 'MOS') {
            return <Recibo1 cliente={cliente} cash={cash} extenso={extenso} funcionario={funcionario} dataAtual={dataAtual()} numeroCtrl={numeroCtrl}/>
        } else if (doc === 'Recibo' && pasta === 'DOS') {
            return <Recibo2 cliente={cliente} cash={cash} extenso={extenso} funcionario={funcionario} dataAtual={dataAtual()} numeroCtrl={numeroCtrl}/>
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
                        setFuncionario(teste2[5])
                        setNumeroCtrl(teste2[6])
                        setExtenso(teste2[7])

                        // if (res[1] === undefined) {
                        //     console.log('')
                        // } else {
                        //     var param = res[1].split('&')
                        //     setFuncionario(param[0])
                        //     setCliente(param[1])
                        //     setExtenso(param[2])
                        //     setValor(param[3])
                        //     setNumeroCtrl(param[4])
                        // }
    },[])

    return (
        <>
            <Button label="Print" icon="pi pi-print" onClick={() => window.print()} style={{ display: 'block', marginBottom: '20px', marginLeft: '6px' }} />

            <div>
                <div className='card'>
                    <div id="invoice-content">
                        {/* <Recibo1 cliente={cliente} cash={cash} extenso={extenso} funcionario={funcionario} dataAtual={dataAtual()} numeroCtrl={numeroCtrl}/> */}
                        {returnDoc()}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Recibos;
