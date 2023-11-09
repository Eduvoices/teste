import React from 'react';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';
import logo from '../src/assets/logo-white.png'

const AppTopbar = (props) => {
    const navigate = useNavigate();
    const topbarMenuClassName = classNames('topbar-menu fadeInDown', { 'topbar-menu-visible': props.topbarMenuActive });
    const profileItemClassName = classNames('user-profile', { 'active-topmenuitem': props.activeTopbarItem === 'profile' });
    const activeTopbarItemClassName = (name) => {
        return name === props.activeTopbarItem ? 'active-topmenuitem' : null;
    };

    const isProfilePopup = props.profileMode === 'popup' || props.isHorizontal;

    return (
        <div className="layout-topbar">
            <button className="layout-topbar-logo p-link" onClick={() => navigate('/')}>
                <img id="layout-topbar-logo" src="assets/layout/images/teste.png" alt="babylon-layout" />
            </button>

            <button className="layout-menu-button p-link" onClick={props.onMenuButtonClick}>
                <i className="pi pi-bars"></i>
            </button>

            <button id="topbar-menu-button" className="p-link" onClick={props.onTopbarMenuButtonClick}>
                <i className="pi pi-ellipsis-v"></i>
            </button>

            <ul className={topbarMenuClassName}>
                {isProfilePopup && (
                    <li className={profileItemClassName}>
                        <button className="p-link" onClick={(e) => props.onTopbarItemClick(e, 'profile')}>
                            <img alt="babylon-layout" src={logo} />
                            <span className="topbar-item-name">Arlene Welch</span>
                        </button>

                        <ul className={classNames({ fadeInDown: !props.isMobile() })}>
                            <li role="menuitem">
                                <button className="p-link" onClick={(e)=> navigate('/alteraSenha')}>
                                    <i className="pi pi-lock"></i>
                                    <span>Alterar Senha</span>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button className="p-link" onClick={(e)=> navigate('/')}>
                                    <i className="pi pi-sign-out"></i>
                                    <span>Sair do sistema</span>
                                </button>
                            </li>
                        </ul>
                    </li>
                )}
                <li className={activeTopbarItemClassName('notifications')}>
                    <button className="p-link" onClick={(e) => navigate('/agenda')}>
                        <i className="topbar-icon pi pi-calendar"></i>
                        <span className="topbar-item-name">Agenda</span>
                    </button>
                </li>
                <li className={activeTopbarItemClassName('messages')}>
                    <button className="p-link" onClick={(e) => props.onTopbarItemClick(e, 'messages')}>
                        <i className="topbar-icon pi pi-inbox"></i>
                        <span className="topbar-item-name">Messages</span>
                        <span className="topbar-badge">8</span>
                    </button>
                    <ul className={classNames({ fadeInDown: !props.isMobile() })}>
                        <li role="menuitem">
                            <button className="topbar-message p-link">
                                <img src="assets/layout/images/avatar-john.png" alt="babylon-layout" />
                                <span>Give me a call</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="topbar-message p-link">
                                <img src="assets/layout/images/avatar-julia.png" alt="babylon-layout" />
                                <span>Reports attached</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="topbar-message p-link">
                                <img src="assets/layout/images/avatar-kevin.png" alt="babylon-layout" />
                                <span>About your invoice</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="topbar-message p-link">
                                <img src="assets/layout/images/avatar-julia.png" alt="babylon-layout" />
                                <span>Meeting today</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="topbar-message p-link">
                                <img src="assets/layout/images/avatar.png" alt="babylon-layout" />
                                <span>Out of office</span>
                            </button>
                        </li>
                    </ul>
                </li>
                <li className={activeTopbarItemClassName('settings')}>
                    <button className="p-link" onClick={(e) => props.onTopbarItemClick(e, 'settings')}>
                        <i className="topbar-icon pi pi-cog"></i>
                        <span className="topbar-item-name">Settings</span>
                    </button>
                    <ul className={classNames({ fadeInDown: !props.isMobile() })}>
                        <li role="menuitem">
                            <button className="p-link">
                                <i className="pi pi-user-plus"></i>
                                <span onClick={(e)=> navigate('/userCadastro')}>Cadastro de Usuário</span>
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default AppTopbar;
