import React from 'react';
import { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const AlteraSenha = () => {
    const [senhaAtual, setSenhaAtual] = useState('')
    const [novaSenha, setNovaSenha] = useState('')
    const [confirmaSenha, setConfirmaSenha] = useState('')

    const refSenhaAtual = useRef(null)
    const refNovaSenha = useRef(null)
    const refConfirmaSenha = useRef(null)
    const refBtn = useRef(null)

    function handleEnter(event) {
        if (event.keyCode === 13) {
            const form = event.target.form
            const index = Array.prototype.indexOf.call(form, event.target)
            form.elements[index + 1].focus()
            event.preventDefault()
        }
    }

    function clear() {
        setConfirmaSenha('')
        setNovaSenha('')
        setSenhaAtual('')
    }

    function enableBtn() {
        let check = confirmaSenha === novaSenha
        if (senhaAtual && check && novaSenha) {
            return false
        } else {
            return true
        }
    }

    function enterAsTab(e) {
        if (e.keyCode === 13) {
            refBtn.current.focus()
        }
    }

    return (
        <div className='flex teste'>
            <div className='col-12 md:col-12 lg:col-4'>
                <div className='card p-fluid' style={{alignItems:'center', justifyContent:'center', display:'flex', flexDirection:'column'}}>
                    <div>
                        <h3>Alterar Senha</h3>
                    </div>

                    <div style={{margin:'16px 0'}}>
                        <span style={{fontSize:'12px', color:'#c4b69c'}}>*Campo obrigatório</span>
                    </div>

                    <form style={{width:'100%'}}>
                        <div className="field col-12 md:col-12">
                            <label htmlFor="senha-atual" data-placeholder='Senha Atual*'>Senha atual</label>
                            <InputText
                            type="password"
                            id='senha-atual'
                            className={senhaAtual !== novaSenha || !senhaAtual ? 'input' : 'input p-invalid'}
                            title='senha-atual'
                            placeholder=''
                            ref={refSenhaAtual}
                            onBlur={(e) => setSenhaAtual(e.target.value)}
                            onKeyDown={handleEnter}
                            />
                            {senhaAtual !== novaSenha || !senhaAtual ? (<span />) : (<p style={{color: 'red'}}>A nova senha não pode ser igual à anterior.</p>)}
                        </div>

                        <div className="field col-12 md:col-12">
                            <label htmlFor="nova-senha" data-placeholder='Nova Senha*'>Nova Senha*</label>
                            <InputText
                            type="password"
                            id='nova-senha'
                            className={senhaAtual !== novaSenha || !senhaAtual ? 'input' : 'input p-invalid'}
                            title='nova-senha'
                            placeholder=''
                            onKeyDown={handleEnter}
                            ref={refNovaSenha}
                            onBlur={(e) => setNovaSenha(e.target.value)}
                            />
                        </div>

                        <div className="field col-12 md:col-12">
                            <label htmlFor="confirma-senha" data-placeholder='Confirmar Senha*'>Confirma Senha*</label>
                            <InputText
                            type="password"
                            id='confirma-senha'
                            className={confirmaSenha === novaSenha || !confirmaSenha ? 'input' : 'input p-invalid'}
                            title='confirma-senha'
                            placeholder=''
                            onKeyDown={enterAsTab}
                            ref={refConfirmaSenha}
                            onChange={(e) => setConfirmaSenha(e.target.value)}
                            />
                            {confirmaSenha === novaSenha || !confirmaSenha ? (<span />) : (<p style={{color: 'red'}}>Digite uma senha igual</p>)}
                        </div>

                        <div className='flex'>
                            <Button style={{width:'140px'}} type='button' className={!enableBtn() ? '' : 'disabled'} disabled={enableBtn()} ref={refBtn}>
                                <i  alt="Confirmar" />
                                Confirmar
                            </Button>

                            <Button type='reset' onClick={clear} style={{width:'140px', marginLeft:'8px'}}>
                                <i alt="Cancelar" />
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AlteraSenha;
