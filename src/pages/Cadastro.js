import React from 'react';
import { useState, useRef } from 'react';
import { InputMask } from 'primereact/inputmask';
import SelectUf from '../components/SelectUF'
import SelectCity from '../components/SelectCities'
import { Accordion, AccordionTab } from 'primereact/accordion';

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
        let sum = 0
        for (let i = 0; i < 9; i++) {
            sum += cpf[i] * (10 -i)
        }
        const resto = (sum * 10) % 11
        if (resto < 10) {
            // eslint-disable-next-line eqeqeq
            return cpf[9] == 0
        }
        // eslint-disable-next-line eqeqeq
        return cpf[9] == 0
    }

    function validarSegundoDigito(cpf) {
        let sum = 0
        for (let i = 0; i < 10; i++) {
            sum += cpf[i] * (11 - i)
        }
        const resto = (sum * 10) % 11
        if (resto < 10) {
            // eslint-disable-next-line eqeqeq
            return cpf[10] == 0
        }
        // eslint-disable-next-line eqeqeq
        return cpf[10] == 0
    }

    function validarRepetido(cpf) {
        const primeiro = cpf[0]
        let diferente = false
        for (let i = 1; i < cpf.length; i++) {
            // eslint-disable-next-line eqeqeq
            if (cpf[i] != primeiro) {
                diferente = true
            }
        }
        return diferente
    }

    function validarCpf(cpf) {
        // eslint-disable-next-line eqeqeq
        if (cpf.length != 11) {
            return false
        }
        if (!validarRepetido(cpf)) {
            return false
        }
        if (!validarPrimeiroDigito(cpf)) {
            return false
        }
        if (!validarSegundoDigito(cpf)) {
            return false
        }
        return true
    }

    const cpfValido = validarCpf(cpf)

    const handleChange = (e) => {
        setCPF(e.target.value)
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        const {value, name} = e.target
        setFormValue({...formValue, [name]: value})
        setUf(value)
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
        <div className="grid help-page">
            <div className="col-12">
                <div className="card help-search grid">
                    <div className="help-search-content col-12">
                        <h1>We are here to help</h1>
                        <div className="search-container">
                            <i className="pi pi-search"></i>
                            <input type="text" className="p-inputtext" placeholder="Search" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 lg:col-6">
                <h6>General</h6>
                <Accordion activeIndex={0}>
                    <AccordionTab header="Header I">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="Header II">
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                            enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="Header III">
                        <p>
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                            culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                        </p>
                    </AccordionTab>
                </Accordion>

                <h6>FAQ</h6>
                <Accordion activeIndex={0}>
                    <AccordionTab header="FAQ I">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="FAQ II">
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                            enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                        </p>
                    </AccordionTab>
                    <AccordionTab header="FAQ III">
                        <p>
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                            culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                        </p>
                    </AccordionTab>
                </Accordion>
            </div>

            <div className="col-12 lg:col-6">
                <div className="card status-card">
                    <h6>System Status</h6>
                    <p>All services are operational.</p>
                    <div className="status-bars">
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar status-bar-failure"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                        <div className="status-bar"></div>
                    </div>
                    <div className="status-bar-footer">
                        <span>30 Days Ago</span>
                        <span>Today</span>
                    </div>
                </div>

                <div className="card articles-card">
                    <h6>Articles</h6>
                    <p>Recent articles from our team.</p>
                    <div className="blog-posts">
                        <div className="blog-post">
                            <div className="blog-text">
                                <h1>Building Revenue With Confidence</h1>
                                <span>And avoiding failures</span>
                            </div>
                            <div className="blog-profile">
                                <img src="assets/demo/images/avatar/miracle.png" alt="babylon-layout" />
                            </div>
                        </div>

                        <div className="blog-post">
                            <div className="blog-text">
                                <h1>Latest Marketing Trends</h1>
                                <span>Don't miss out our tips</span>
                            </div>
                            <div className="blog-profile">
                                <img src="assets/demo/images/avatar/kaylynn.png" alt="babylon-layout" />
                            </div>
                        </div>

                        <div className="blog-post">
                            <div className="blog-text">
                                <h1>How To Reach Your Audience</h1>
                                <span>10 ways to increase your efficiency</span>
                            </div>
                            <div className="blog-profile">
                                <img src="assets/demo/images/avatar/angel.png" alt="babylon-layout" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;
