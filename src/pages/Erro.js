import { useNavigate } from "react-router-dom"
import logo from '../assets/logo.png'

const FirstAccess = () => {
    const navigate = useNavigate()
    return (
        <div className="exception-body error">
            <div className="exception-panel"></div>

            <div className="exception-content">
                <img src={logo} alt="Logo Tecjus" />
                <h1>
                    Algo deu <span>Errado</span>
                </h1>
                <p>Este é seu primeiro acesso, entre em contato com o administrador do sistema</p>
                <button onClick={()=>navigate('/')} id='button_a'>Retornar à tela de login</button>
            </div>
        </div>
    )
}

export default FirstAccess
