import logo from '../../src/assets/logo-black.png'
import { HashLink } from 'react-router-hash-link'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <body class="landing-body">
        <div class="landing-wrapper">
            <div id="header">
                <div class="header-top">
                    <img src={logo} class="logo" alt="babylon-layout"/>
                    {/* <a id="landing-menu-button" href="#">
                        <img src="../layout/images/landing/icon-ellipsis-v.svg" alt="Menu"/>
                    </a> */}
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
                            <HashLink to="/#multimedia">Contato</HashLink>
                        </li>
                    </ul>
                </div>

                <div class="header-content">
                    <h1>Tecjus</h1>
                    <p>Tecnologia para Escritórios de Advocacia</p>
                    <button type="button" class="p-button landing-button" >
                        <span class="p-button-text">Saiba Mais</span>
                    </button>
                </div>
            </div>

            <div id="features">
                <h1>Produtos</h1>
                <p>Full Customizable Template</p>
                <div class="grid">
                    <div class="col-12 md:col-12 lg:col-4">
                        <div class="feature-box">
                            <img src="../layout/images/landing/icon-responsivelayout.svg" alt="babylon-layout" />
                            <h3>Responsive Layout</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div class="col-12 md:col-12 lg:col-4">
                        <div class="feature-box">
                            <img src="../layout/images/landing/icon-moderndesign.svg" alt="babylon-layout" />
                            <h3>Modern Design</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div class="col-12 md:col-12 lg:col-4">
                        <div class="feature-box">
                            <img src="../layout/images/landing/icon-welldocumented.svg" alt="babylon-layout" />
                            <h3>Well Documented</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div class="col-12 md:col-12 lg:col-4">
                        <div class="feature-box">
                            <img src="../layout/images/landing/shape.svg" alt="babylon-layout" />
                            <h3>Clean Code</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div class="col-12 md:col-12 lg:col-4">
                        <div class="feature-box">
                            <img src="../layout/images/landing/icon-gorgeous.svg" alt="babylon-layout" />
                            <h3>Gorgeous</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div class="col-12 md:col-12 lg:col-4">
                        <div class="feature-box">
                            <img src="../layout/images/landing/icon-craftedforyou.svg" alt="babylon-layout" />
                            <h3>Crafted for You</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="promo">
                <h1>Serviços</h1>
                <p>Take advantage of media's most prominent business trend which empowers
                    your internal advertising teams.</p>

                <button type="button" class="p-button " >
                    <span class="p-button-text">Learn More</span>
                </button>

                <img src="../layout/images/landing/babylon-icon-cta.png" alt="babylon-layout" />
            </div>

            <div id="pricing">
                <h1>Contato</h1>
                <p>Affordable Prices, Highest Quality</p>

                <div class="grid">
                    <div class="col-12 lg:col-4">
                        <div class="pricing-box">
                            <h3>Beginner</h3>
                            <span class="pricing-intro">Starting From</span>
                            <h3>5$ per month</h3>

                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ex condimentum, bibendum ligula a, ultrices magna.</p>
                            <ul>
                                <li>Responsive</li>
                                <li>Push Messages</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-12 lg:col-4">
                        <div class="pricing-box">
                            <h3>Professional</h3>
                            <span class="pricing-intro">Starting From</span>
                            <h3>10$ per month</h3>

                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ex condimentum, bibendum ligula a, ultrices magna.</p>
                            <ul>
                                <li> Responsive</li>
                                <li> Push Messages</li>
                                <li> 10 Support Tickets</li>
                                <li> Free Shipping</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-12 lg:col-4">
                        <div class="pricing-box">
                            <h3>Enterprise</h3>
                            <span class="pricing-intro">Starting From</span>
                            <h3>20$ per month</h3>

                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ex condimentum, bibendum ligula a, ultrices magna.</p>
                            <ul>
                                <li> Responsive</li>
                                <li> Push Messages</li>
                                <li> 10 Support Tickets</li>
                                <li> Free Shipping</li>
                                <li> Unlimited Space</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div id="multimedia">
                <h1>Multimedia</h1>
                <p>Duis nec lobortis massa, sed facilisis lorem. In hac habitasse platea dictumst. </p>
                <div class="video-container">
                    <iframe title="vídeo" src="https://www.youtube.com/embed/Mcb8JtyQDJ4" frameborder="0" width="560"></iframe>
                </div>
            </div>

            <div id="footer">
                <div class="grid">
                    <div class="col-12 lg:col-4">
                        <img src="../layout/images/logo-white.png" alt="babylon-layout" class="footer-logo"/>
                    </div>

                    <div class="col-12 lg:col-8 footer-menu">
                        <div class="grid">
                            <div class="col-12 md:col-6 lg:col-3">
                                <span>OVERVIEW</span>

                                <a href="#primefaces">Why PrimeFaces</a>

                                <a href="#prime">Who Uses PrimeFaces</a>

                                <a href="#testimonials">Testimonials</a>

                                <a href="#licence">License</a>

                            </div>
                            <div class="col-12 md:col-6 lg:col-3">
                                <span>DEMOS</span>

                                <a href="#faces">PrimeFaces</a>

                                <a href="#ng">PrimeNG</a>

                                <a href="#react">PrimeReact</a>

                                <a href="#ui">PrimeUI</a>

                            </div>
                            <div class="col-12 md:col-6 lg:col-3">
                                <span>SUPPORT</span>

                                <a href="#options">Support Options</a>

                                <a href="#pro">PRO</a>

                                <a href="#elite">Elite</a>

                                <a href="#forum">Forum</a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </body>

    )
}

export default LandingPage
