import logo from '../../src/assets/logo-black.png'
import { HashLink } from 'react-router-hash-link'
import { Link } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useState } from 'react';

const LandingPage = () => {
    const [open, setOpen] = useState(false)

    function openMenu() {
        setOpen(!open)
    }

    return (
        <div className="landing-body">
        <div className="landing-wrapper">
            <div id="header">
                <div className="header-top">
                    <img src={logo} className="logo" alt="babylon-layout"/>

                        <span id="landing-menu-button">
                            {open === false ? (
                                    <ul className='ul-menu'>
                                        <li>
                                            <i className="pi pi-ellipsis-v" onClick={openMenu}></i>
                                        </li>
                                    </ul>
                            ) : (
                                <ul className='ul-menu'>
                                    <li>
                                        <HashLink to='/#header'>Home</HashLink>
                                    </li>
                                    <li>
                                        <HashLink to='/#features'>Produtos</HashLink>
                                    </li>
                                    <li>
                                        <HashLink to="/#promo">Serviços</HashLink>
                                    </li>
                                    <li>
                                        <Link to='/login'>Login</Link>
                                    </li>
                                    <li>
                                        <HashLink to="/#pricing">Contato</HashLink>
                                    </li>
                                    <li>
                                        <i className='pi pi-times' onClick={openMenu}></i>
                                    </li>
                                </ul>
                            )}
                        </span>

                        <ul id="landing-menu">
                            <li>
                                <HashLink to='/#header'>Home</HashLink>
                            </li>
                            <li>
                                <HashLink to='/#features'>Produtos</HashLink>
                            </li>
                            <li>
                                <HashLink to="/#promo">Serviços</HashLink>
                            </li>
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                            <li>
                                <HashLink to="/#pricing">Contato</HashLink>
                            </li>
                        </ul>
                </div>

                <div className="header-content">
                    <h1>TECJUS</h1>
                    <p>Tecnologia para Escritórios de Advocacia</p>
                    <button type="button" className="p-button landing-button" >
                        <span className="p-button-text">Saiba Mais</span>
                    </button>
                </div>
            </div>

            <div id="features">
                <h1>TECJUSWeb</h1>
                <p>Software para Gestão de Escritórios de Advocacia</p>
                <div className="grid">
                    <div className="col-12 md:col-12 lg:col-4">
                        <div className="feature-box">
                            <i className='pi pi-palette' />
                            <p>Design moderno</p>
                        </div>
                    </div>
                    <div className="col-12 md:col-12 lg:col-4">
                        <div className="feature-box">
                            <i className='pi pi-info-circle'/>
                            <p>Fácil de usar</p>
                        </div>
                    </div>
                    <div className="col-12 md:col-12 lg:col-4">
                        <div className="feature-box">
                            <i className='pi pi-wrench'/>
                            <p>Suporte Qualificado</p>
                        </div>
                    </div>
                    <div className="col-12 md:col-12 lg:col-4">
                        <div className="feature-box">
                            <i className='pi pi-users'/>
                            <p>Integração da Equipe</p>
                        </div>
                    </div>
                    <div className="col-12 md:col-12 lg:col-4">
                        <div className="feature-box">
                            <i className='pi pi-chart-line'/>
                            <p>Indicadores para Gestão</p>
                        </div>
                    </div>
                    <div className="col-12 md:col-12 lg:col-4">
                        <div className="feature-box">
                            <i className='pi pi-dollar'/>
                            <p>Notas Fiscais e Boletos</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="promo">
                <h1>Serviços</h1>

                <div className='div-flex'>
                    <p className='feature-box'>
                    <i className='pi pi-briefcase' style={{marginRight:'8px'}}/>
                        Controladoria Jurídica
                    </p>
                    <p className='feature-box'>
                        <i className='pi pi-search' style={{marginRight:'8px'}}/>
                        Consultoria
                    </p>
                </div>

            </div>

            <div id="pricing">
                <h1>Contato</h1>
                <div className="col-12">
                    <div className="card">
                        <form action='https://formsubmit.co/contato@tecjus.com.br' method="POST">
                            <div className="p-fluid formgrid grid">
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="firstname2">Nome completo</label>
                                    <InputText id="firstname2" type="text" />
                                </div>
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="lastname2">Email</label>
                                    <InputText id="lastname2" type="email"/>
                                </div>
                                <div className="field col-12">
                                    <label htmlFor="address">Mensagem</label>
                                    <InputTextarea id="address" rows="4" style={{resize:'none'}}/>
                                </div>
                            </div>
                            <div className='button-div'>
                                <Button type='submit' label='Enviar'/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div id="footer">
                <div className="grid">
                    <div className="col-12 lg:col-4">
                        <img src={logo} alt="babylon-layout" className="footer-logo"/>
                    </div>
                </div>
            </div>
        </div>

    </div>

    )
}

export default LandingPage
