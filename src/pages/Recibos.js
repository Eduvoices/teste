import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Recibo1 from '../components/documentos/_recibo1';
import { Dropdown } from 'primereact/dropdown';
import Recibo2 from '../components/documentos/_recibo2';
import Procuração from '../components/documentos/_documento1';

const Recibos = () => {
    const [nome, setNome] = useState('')
    const [emitente, setEmitente] = useState('')
    const [valor, setValor] = useState('')
    const [extenso, setExtenso] = useState('')
    const [numeroCtrl, setNumeroCtrl] = useState('')
    const [doc, setDoc] = useState('')

    function dataAtual() {
        let data = new Date()
        let day = data.getDate().toString().padStart(2, '0')
        let month = String(data.getMonth() + 1).padStart(2, '0')
        return `${day}/${month}/${data.getFullYear()}`
    }

    const dropdownValues = [
        {name: 'recibo-standard'},
        {name: 'recibo-alt'},
        {name: 'procuração'},
        {name: 'nota-promissória'}
    ]

    function handleInputChange(e) {
        e.preventDefault()
        const {value} = e.target
        setDoc(value)
        console.log(doc)
    }

    function returnDoc() {
        if (doc.name === 'recibo-standard') {
            return <Recibo1 numeroCtrl={numeroCtrl} nome={nome} cash={cash} extenso={extenso} emitente={emitente} dataAtual={dataAtual()}/>
        } else if (doc.name === 'recibo-alt') {
            return <Recibo2 numeroCtrl={numeroCtrl} nome={nome} cash={cash} extenso={extenso} emitente={emitente} dataAtual={dataAtual()}/>
        } else if (doc.name === 'procuração') {
            return <Procuração dataAtual={dataAtual()} outorgante={emitente}/>
        } else {
            return <h4>Nota promissória</h4>
        }
    }

    const cash = parseFloat(valor).toLocaleString('pt-br', {minimumFractionDigits: 2})

    return (
        <>
            <Button label="Print" icon="pi pi-print" onClick={() => window.print()} style={{ display: 'block', marginBottom: '20px', marginLeft: '6px' }} />

            <div className='grid'>
                <div className='col-12'>
                    <div className='card p-fluid'>
                        <h3>Informações</h3>

                        <div className="formgrid grid" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <div className="field col">
                                <label htmlFor="emitente" >
                                    Emitente
                                </label>
                                <InputText type='text' id='emitente' onChange={(e)=>setEmitente(e.target.value)}/>
                            </div>
                            <div className="field col">
                                <label htmlFor="ctrlNumber" >
                                    Número de controle
                                </label>
                                <InputText type='number' id='ctrlNumber' onChange={(e)=>setNumeroCtrl(e.target.value)}/>
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
                                <Dropdown value={doc} onChange={handleInputChange} options={dropdownValues} optionLabel="name" placeholder="Tipo"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-12'>
                <div className='card'>
                    <div id="invoice-content">
                        {returnDoc()}
                        {/* <Recibo1 numeroCtrl={numeroCtrl} nome={nome} cash={cash} extenso={extenso} emitente={emitente} dataAtual={dataAtual()}/> */}
                        {/* <div>
                            <img src={logo} alt=""/>
                            <h1>RECIBO</h1>
                            <div id="controle">
                                <span>{numeroCtrl}</span>
                            </div>
                            <p>Recebemos de <span id="recibo_nome">{nome}</span> a importância de <span id="recibo_valor">R$ {cash}</span> ({extenso}), referente ao pagamento de honorários advocatícios.</p>
                            <span id="data">{dataAtual()}</span>
                            <span id="assinatura">{emitente}</span>

                            <div className="canhoto">
                                <span>{dataAtual()}</span>
                                <span id="recibo_nome">{nome}</span>
                                <span>R$ {cash}</span>
                                <span>{numeroCtrl}</span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Recibos;
