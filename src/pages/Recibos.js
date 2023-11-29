import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import Recibo1 from '../components/documentos/_testeDocs/_testeRecibo';
import Recibo2 from '../components/documentos/_teste2Docs/_teste2Recibo';
import Procuração from '../components/documentos/_testeDocs/_testeProcuração';
import Procuração2 from '../components/documentos/_teste2Docs/_teste2Procuração';

const Recibos = () => {
const [nome, setNome] = useState('')
    const [emitente, setEmitente] = useState('')
    const [valor, setValor] = useState('')
    const [extenso, setExtenso] = useState('')
    const [doc, setDoc] = useState('')
    const [param, setParam] = useState('Escritório 1')

    function dataAtual() {
        let data = new Date()
        let day = data.getDate().toString().padStart(2, '0')
        let month = String(data.getMonth() + 1).padStart(2, '0')
        return `${day}/${month}/${data.getFullYear()}`
    }

    const dropdownValues = [
        {name: 'Recibo'},
        {name: 'Procuração'},
    ]

    const dropdownEscritorios = [
        {name: 'Escritório 1'},
        {name: 'Escritório 2'}
    ]

    function handleInputChange(e) {
        e.preventDefault()
        const {value} = e.target
        setDoc(value)
    }

    function handleOfficeChange(e) {
        e.preventDefault()
        const {value} = e.target
        setParam(value)
    }

    function returnDoc() {
        if (doc.name === 'Recibo' && param.name === 'Escritório 1') {
            return <Recibo1 nome={nome} cash={cash} extenso={extenso} emitente={emitente} dataAtual={dataAtual()}/>
        } else if (doc.name === 'Recibo' && param.name === 'Escritório 2') {
            return <Recibo2 nome={nome} cash={cash} extenso={extenso} emitente={emitente} dataAtual={dataAtual()}/>
        } else if (doc.name === 'Procuração' && param.name === 'Escritório 1') {
            return <Procuração dataAtual={dataAtual()} outorgante={emitente}/>
        } else if (doc.name === 'Procuração' && param.name === 'Escritório 2') {
            return <Procuração2 dataAtual={dataAtual()} outorgante={emitente}/>
        }
    }

    const cash = parseFloat(valor).toLocaleString('pt-br', {minimumFractionDigits: 2})

    return (
        <>
            <Button label="Print" icon="pi pi-print" onClick={() => window.print()} style={{ display: 'block', marginBottom: '20px', marginLeft: '6px' }} />

            <div className='grid'>
                <div className='col-12 md:col-12'>
                    <div className='card p-fluid'>
                        <h3>Informações</h3>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="emitente" >
                                    Emitente
                                </label>
                                <InputText type='text' id='emitente' onChange={(e)=>setEmitente(e.target.value)}/>
                            </div>

                            <div className="field col">
                                <label htmlFor="nome" >
                                    Recebemos de
                                </label>
                                <InputText type='text' id='nome' onChange={(e)=>setNome(e.target.value)}/>
                            </div>

                            <div className="field col">
                                <label htmlFor="valor" >
                                    R$
                                </label>
                                <InputText type='number' id='valor'step='0.01' onChange={(e)=>setValor(e.target.value)}/>
                            </div>
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="extenso" >
                                    Valor por extenso (opcional)
                                </label>
                                <InputText type='text' id='extenso' onChange={(e)=>setExtenso(e.target.value)}/>
                            </div>

                            <div className="field col">
                                <label htmlFor="extenso" >
                                    Tipo de documento
                                </label>
                                <Dropdown value={doc} onChange={handleInputChange} options={dropdownValues} optionLabel="name" placeholder="Tipo de documento"/>
                            </div>


                            <div className="field col">
                                <label htmlFor="extenso" >
                                    Escritório
                                </label>
                                <Dropdown value={param} onChange={handleOfficeChange} options={dropdownEscritorios} optionLabel="name" placeholder="Escritório"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
