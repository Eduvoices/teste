import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';


const UserCadastro = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [radioValue, setRadioValue] = useState('')

    const RefPassword = useRef(null)
    const RefConfirm = useRef(null)
    const RefBtn = useRef(null)

    function enterAsTab(e) {
        if (e.keyCode === 13) {
            RefBtn.current.focus()
        }
    }

    function handleEnter(event) {
        if (event.keyCode === 13) {
            const form = event.target.form
            const index = Array.prototype.indexOf.call(form, event.target)
            form.elements[index + 1].focus()
            event.preventDefault()
        }
    }

    function clear() {
        setConfirmPassword('')
        setEmail('')
        setPassword('')
        setRadioValue('')
    }

    function confereSenha(e) {
        const senha = RefPassword.current.value
        const confirma = RefConfirm.current.value
        setConfirmPassword(e.target.value)

        if (senha !== confirma) {
            RefConfirm.current.value = ''
        }
    }

    function enable() {
        let teste = confirmPassword === password
        if (email && teste && password && radioValue) {
            return false
        } else {
            return true
        }
    }

    return (
        <div className='flex'>
            <div className='col-12 md:col-4'>
                <div className='card p-fluid' style={{alignItems:'center', justifyContent:'center', display:'flex', flexDirection:'column'}}>
                    <div>
                        <h3>Cadastro de Usuário</h3>
                    </div>

                    <div style={{margin:'16px 0'}}>
                        <span style={{fontSize:'12px', color:'#c4b69c'}}>*Campo obrigatório</span>
                    </div>

                    <form>
                        <div className="field col-12 md:col-12">
                            <label htmlFor="email" data-placeholder='Senha Atual*'>Email</label>
                            <InputText
                            id='email'
                            className="input"
                            type="email"
                            title='email'
                            placeholder=''
                            value={email}
                            ref={RefPassword}
                            onChange={(e)=>setEmail(e.target.value)}
                            onKeyDown={handleEnter}/>
                        </div>

                        <div className="field col-12 md:col-12">
                            <label htmlFor="password" data-placeholder='Nova Senha*'>Nova Senha*</label>
                            <InputText
                            id='password'
                            required
                            className="input"
                            type="password"
                            title='password'
                            placeholder=''
                            onKeyDown={handleEnter}
                            ref={RefPassword}
                            onBlur={(e)=>setPassword(e.target.value)}/>
                            <label htmlFor="nova-senha" data-placeholder='Nova Senha*'></label>
                        </div>

                        <div className="field col-12 md:col-12">
                            <label htmlFor="confirm-password" data-placeholder='Confirmar Senha*'>Confirma Senha*</label>
                            <InputText
                            id='confirmPassword'
                            required
                            className="input"
                            type="password"
                            title='confirmPassword'
                            placeholder=''
                            onKeyDown={handleEnter}
                            onBlur={confereSenha}
                            ref={RefConfirm}
                            />
                            {confirmPassword === password ? (<span />) : (<p>Digite uma senha igual</p>)}
                        </div>

                        <div className="field col-12 md:col-12">
                            <span>Status*</span>
                            <div className='flex' style={{marginTop:'8px'}}>
                        <div className="col-12 md:col-4">
                            <div className="field-radiobutton">
                                <RadioButton inputId="option1" name="option" value="Ativo" checked={radioValue === 'Ativo'} onChange={(e) => setRadioValue(e.value)} />
                                <label htmlFor="option1">Ativo</label>
                            </div>
                        </div>
                        <div className="col-12 md:col-4">
                            <div className="field-radiobutton">
                                <RadioButton inputId="option2" name="option" value="Cancelado" checked={radioValue === 'Cancelado'} onChange={(e) => setRadioValue(e.value)} />
                                <label htmlFor="option2">Cancelado</label>
                            </div>
                        </div>

                            </div>
                    </div>


                        <div className='flex'>
                            <Button style={{width:'140px'}} type='button' className={!enable() ? '' : 'disabled'} disabled={enable()} ref={RefBtn}>
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

export default UserCadastro;
