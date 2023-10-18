import React from 'react';
import { useState, useRef } from 'react';
import { InputMask } from 'primereact/inputmask';
import SelectUf from '../components/SelectUF'
import SelectCity from '../components/SelectCities'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const Cadastro = () => {
    const [street, setStreet] = useState('')
    const [block, setBlock] = useState('')
    const [cpf, setCPF] = useState('')
    const [formValue, setFormValue] = useState({})
    const [cepState, setCepState] = useState('')
    const [rg, setRg] = useState('')
    const [tel1, setTel1] = useState('')
    const [tel2, setTel2] = useState('')
    const [tel3, setTel3] = useState('')
    const [birth, setBirth] = useState('')
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [code, setCode] = useState('')
    const [uf, setUf] = useState('')
    const [city, setCity] = useState('')

    const [email, setEmail] = useState('')
    const [emailErr, setEmailErr] = useState('')

    const ref = useRef(null),
    refTel = useRef(null),
    refCep = useRef(null),
    refBtn = useRef(null)

    const nome = name
    const numero = number

    function enterAsTab(e) {
        if (e.keyCode === 13) {
            refBtn.current.focus()
        }
    }

    let cep = ''

    const checkCEP = (e) => {
        setCepState(e.target.value)
        if (!e.target.value) return
        cep = e.target.value.replace(/\D/g, '')
        fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
            setStreet(data.logradouro)
            setBlock(data.bairro)
            setUf(data.uf)
            setCity(data.localidade)
        }).catch((err) => console.log(''))
    }

    function limpaCampo(e) {
        setStreet('')
        setBlock('')
        setCepState('')
        setRg('')
        setTel1('')
        setTel2('')
        setTel3('')
        setCPF('')
        setBirth('')
        setCode('')
        setCity('')
        setUf('')
        refTel.current.value = ''
        refCep.current.value = ''
    }

    function validarPrimeiroDigito(cpf) {
        let sum = 0;
        for (let i = 0; i < 9; i++) {
          sum += cpf[i] * (10 - i);
        }
        const resto = (sum * 10) % 11;
        if (resto < 10) {
            // eslint-disable-next-line eqeqeq
            return cpf[9] == resto;
        }
        // eslint-disable-next-line eqeqeq
        return cpf[9] == 0;
        }

        function validarSegundoDigito(cpf) {
        let sum = 0;
        for (let i = 0; i < 10; i++) {
          sum += cpf[i] * (11 - i);
        }
        const resto = (sum * 10) % 11;
        if (resto < 10) {
            // eslint-disable-next-line eqeqeq
            return cpf[10] == resto;
        }
        // eslint-disable-next-line eqeqeq
        return cpf[10] == 0;
        }

        function validarRepetido(cpf) {
        const primeiro = cpf[0];
        let diferente = false;
        for(let i = 1; i < cpf.length; i++) {
            // eslint-disable-next-line eqeqeq
            if(cpf[i] != primeiro) {
            diferente = true;
            }
        }
        return diferente;
        }

        function validarCpf(cpf) {
            // eslint-disable-next-line eqeqeq
            if (cpf.length != 11) {
            return false;
            }
            if(!validarRepetido(cpf)) {
            return false;
            }
            if (!validarPrimeiroDigito(cpf)) {
            return false;
            }
            if (!validarSegundoDigito(cpf)) {
            return false;
            }
            return true;
        }

        const cpfValido = validarCpf(cpf)

    const handleChange = (event) => {
        setCPF(event.target.value)
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        const {value, name} = e.target
        setFormValue({...formValue, [name]: value})
        setUf(value)
    }

    const handleCityChange = (e) => {
        e.preventDefault()
        const {value, name} = e.target
        setFormValue({...formValue, [name] : value})
        setCity(value)
    }

    function handleEnter(event) {
        if (event.keyCode === 13) {
            const form = event.target.form
            const index = Array.prototype.indexOf.call(form, event.target)
            form.elements[index + 1].focus()
            event.preventDefault()
        }
    }

    const validEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$")

    const validate = () => {
        if (!validEmail.test(email)) {
            setEmailErr(true)
        } else {
            setEmailErr(false)
        }
    }

    function enable() {
        if (street && cpfValido && nome && numero && tel1 && block && code && cepState && uf && city) {
            return false
        } else {
            return true
        }
    }


    return (
        <form>
            <div className='grid'>
                <div className='col-12 md:col-6'>
                    <div className="card p-fluid">
                            <h5>Pessoa física</h5>

                            <div style={{margin:'16px 0'}}>
                                <span style={{fontSize:'12px', color:'#c4b69c'}}>*Campo obrigatório</span>
                            </div>

                            <div className="formgrid grid">
                                    <div className="field col">
                                        <label htmlFor="code">Código</label>
                                        <InputText
                                        id="code"
                                        type="number"
                                        onKeyUp={handleEnter}
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}/>
                                    </div>
                                    <div className="field col">
                                        <label htmlFor="nome">Nome completo*</label>
                                        <InputText
                                        id="nome"
                                        type="text"
                                        title='nome'
                                        placeholder=''
                                        onBlur={(e) => setName(e.target.value)}
                                        onKeyUp={handleEnter}
                                        />
                                    </div>
                            </div>

                            <div className="formgrid grid">
                                    <div className="field col">
                                        <label htmlFor="rg">RG</label>
                                        <InputMask
                                        mask="99.999.999-9"
                                        className='input'
                                        id='rg' title='rg'
                                        placeholder=''
                                        name='rg'
                                        onChange={(e) => setRg(e.target.value)}
                                        value={rg}
                                        onKeyUp={handleEnter}
                                        />
                                    </div>
                                    <div className="field col">
                                        <label htmlFor="cpf">CPF*</label>
                                        <InputText
                                        maxLength={14}
                                        className='input'
                                        id='cpf'
                                        title='cpf'
                                        placeholder=''
                                        onBlur={handleChange}
                                        ref={ref}
                                        onKeyUp={handleEnter}
                                        />
                                        {cpfValido === true || cpf.length < 11 ? (
                                    <span id='valid'></span>
                                ) : (
                                    <span id='invalid'>CPF inválido</span>
                                )}
                                    </div>
                            </div>

                            <div className="formgrid grid">
                                    <div className="field col">
                                        <label htmlFor="nascimento">Data de nascimento</label>
                                        <InputMask
                                        onKeyUp={handleEnter}
                                        mask="99/99/9999"
                                        className='input'
                                        id='nascimento'
                                        title='nascimento'
                                        onChange={(e)=>setBirth(e.target.value)}
                                        placeholder=''
                                        value={birth} />
                                    </div>
                                    <div className="field col">
                                        <label htmlFor="cep">CEP*</label>
                                        <InputMask
                                        mask="99.999-999"
                                        className='input'
                                        id='cep'
                                        onBlur={checkCEP}
                                        title='cep'
                                        placeholder=''
                                        ref={refCep}
                                        // value={cepState}
                                        onKeyUp={handleEnter}
                                    />
                                    </div>
                            </div>

                            <div className="formgrid grid">
                                    <div className="field col">
                                        <label htmlFor="endereco">Endereço*</label>
                                        <InputText
                                        className="input"
                                        type="text"
                                        id='endereco'
                                        defaultValue={street}
                                        onChange={(e)=> setStreet(e.target.value)}
                                        title='endereço'
                                        placeholder=''
                                        onKeyDown={handleEnter}/>
                                    </div>
                                    <div className="field col">
                                        <label htmlFor="numero">Nº*</label>
                                        <InputText
                                        className="input"
                                        type="number"
                                        id='numero'
                                        title='numero'
                                        placeholder=''
                                        onBlur={(e)=>setNumber(e.target.value)}
                                        onKeyDown={handleEnter}
                                        />
                                    </div>
                            </div>

                            <div className="formgrid grid">
                                    <div className="field col">
                                        <label htmlFor="complemento">Complemento</label>
                                        <InputText
                                        className="input"
                                        type="text"
                                        id='complemento'
                                        title='complemento'
                                        placeholder=''
                                        onKeyDown={handleEnter}/>
                                    </div>
                                    <div className="field col">
                                        <label htmlFor="bairro">Bairro*</label>
                                        <InputText
                                        className="input"
                                        type="text"
                                        id='bairro'
                                        defaultValue={block}
                                        title='bairro'
                                        placeholder=''
                                        onChange={(e) => setBlock(e.target.value)}
                                        onKeyDown={handleEnter}
                                        />
                                    </div>
                            </div>

                            <div className="formgrid grid">
                                    <div className="field col">
                                        <label htmlFor="states">UF</label>
                                        <SelectUf id='states' name='states' onChange={handleInputChange} uf={uf}/>
                                    </div>
                                    <div className="field col">
                                        <label htmlFor="city">Cidade</label>
                                        <SelectCity id='city' name='city' state={formValue.states || uf} city={city} onChange={handleCityChange}/>
                                    </div>
                            </div>
                    </div>
                </div>

                <div className='col-12 md:col-6'>
                    <div className="card p-fluid">
                            <div className="formgrid grid">
                                    <div className="field col">
                                        <label htmlFor="telefone1">Telfone1*</label>
                                        <InputMask
                                        mask="(99) 99999-9999"
                                        className='input'
                                        onBlur={(e)=>setTel1(e.target.value)}
                                        id='telefone1'
                                        title='telefone1'
                                        ref={refTel}
                                        placeholder=''
                                        name='tel1'
                                        onKeyUp={handleEnter}/>
                                    </div>
                                    <div className="field col">
                                        <label htmlFor="telefone2">Telefone2</label>
                                        <InputMask
                                        mask="(99) 99999-9999"
                                        className='input'
                                        id='telefone2'
                                        title='telefone2'
                                        placeholder=''
                                        onChange={(e) => setTel2(e.target.value)}
                                        value={tel2}
                                        name='tel2'
                                        onKeyUp={handleEnter}/>
                                    </div>
                            </div>

                            <div className="formgrid grid">
                                    <div className="field col">
                                        <label htmlFor="telefone3">Telefone3</label>
                                        <InputMask
                                        mask="(99) 99999-9999"
                                        className='input'
                                        id='telefone3'
                                        onChange={(e) => setTel3(e.target.value)}
                                        value={tel3}
                                        title='telefone3'
                                        name='tel3'
                                        onKeyUp={handleEnter}/>
                                    </div>
                                    <div className="field col">
                                        <label htmlFor="email">Email</label>
                                        <InputText
                                        className="input"
                                        type="email"
                                        id='email'
                                        autoComplete='off'
                                        title='email'
                                        onChange={(e)=>setEmail(e.target.value)}
                                        value={email}
                                        onBlur={validate}
                                        onKeyDown={handleEnter}
                                        />
                                        {emailErr && <p>Por favor, digite um email válido</p>}
                                    </div>
                            </div>

                            <div className="formgrid grid">
                                    <div className="field col">
                                        <label htmlFor="social">Rede Social</label>
                                        <InputText
                                        className="input"
                                        type="text"
                                        id='social'
                                        title='rede-social'
                                        onKeyDown={handleEnter}/>
                                    </div>
                                    <div className="field col">
                                        <label htmlFor="responsavel">Responsável</label>
                                        <InputText
                                        className="input"
                                        type="text"
                                        id='responsavel'
                                        title='responsavel'
                                        placeholder=''
                                        onKeyDown={handleEnter}
                                        />
                                    </div>
                            </div>

                            <div className="formgrid grid">
                                    <div className="field col">
                                        <label htmlFor="nome">Observações</label>
                                        <InputText
                                        className="input"
                                        type="text"
                                        id='observation'
                                        title='observação'
                                        placeholder=''
                                        onKeyDown={enterAsTab}
                                        />
                                    </div>
                            </div>
                    </div>
                </div>
                <div className='flex'>
                            <Button style={{width:'140px'}} type='button' className={!enable() ? '' : 'disabled'} disabled={enable()} ref={refBtn}>
                                <i  alt="Confirmar" />
                                Confirmar
                            </Button>

                            <Button type="reset" onClick={limpaCampo} style={{width:'140px', marginLeft:'8px'}}>
                                <i alt="Cancelar" />
                                Cancelar
                            </Button>
                        </div>
            </div>
        </form>
    );
};

export default Cadastro;
