import React, { useState, useRef, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import AppTopbar from './AppTopbar';
import AppFooter from './AppFooter';
import AppMenu from './AppMenu';
import AppBreadcrumb from './AppBreadcrumb';
import AppInlineProfile from './AppInlineProfile';

import Agenda from './pages/Agenda'
import Recibos from './pages/Recibos';
import UserCadastro from './pages/UserCadastro';
import Cadastro from './pages/Cadastro';
import AlteraSenha from './pages/AlteraSenha';
import CrudDemo from './pages/Consulta';

import Dashboard from './components/Dashboard';

import { Tooltip } from 'primereact/tooltip';
import logo from '../src/assets/logo-white.png'

import { classNames } from 'primereact/utils';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';
import './layout-blue.css'
import './theme-blue.css'
import TitulosEmAberto from './pages/TitulosEmAberto';
import TiposDocumento from './pages/TiposDocumento';

const App = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [menuMode] = useState('static');
    const [darkMenu] = useState(true);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [topbarMenuActive, setTopbarMenuActive] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [activeTopbarItem, setActiveTopbarItem] = useState(null);
    const [inlineMenuActive, setInlineMenuActive] = useState(false);
    const [profileMode] = useState('popup');
    const [configActive, setConfigActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();

    const navigate = useNavigate();

    let menuClick = false;
    let configClick = false;
    let topbarItemClick = false;
    let inlineMenuClick = false;

    const breadcrumb = [
        { path: '/dashboard', parent: 'Dashboard', label: 'Painel' },
        { path: '/userCadastro', parent: 'Utilities', label: 'Cadastro de Usuário' },
        { path: '/pessoa_fisica', parent: 'Pages', label: 'Pessoa Física' },
        // { path: '/invoice', parent: 'Pages', label: 'recibos' },
        { path: '/cadastro', parent: 'Pages', label: 'Cadastro' },
        { path: '/alteraSenha', parent: 'Pages', label: 'Alterar Senha' },
        { path: '/agenda', parent: 'Pages', label: 'Agenda' },
        { path: '/titulos_em_aberto', parent: 'Pages', label: 'Títulos em aberto'},
        {path: '/tipo_documento', parent:'Pages', label: 'Tipo de Documento'}
    ];

    const menu = [
        {
            label: 'Home Page',
            icon: 'pi pi-fw pi-home',
            items: [{ label: 'Painel', icon: 'pi pi-fw pi-home', to: '/dashboard' }]
        },
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-clone',
            items: [
                { label: 'Pessoa Física', icon: 'pi pi-fw pi-user', to: '/pessoa_fisica' },
                { label: 'Títulos em aberto', icon: 'pi pi-fw pi-dollar', to: '/titulos_em_aberto'},
                { label: 'Tipo de documento', icon: 'pi pi-fw pi-folder-open', to: '/tipo_documento'}
                // {label: 'Recibos', icon: 'pi pi-fw pi-dollar', to: '/invoice'},
                // { label: 'Wizard', icon: 'pi pi-fw pi-star-fill', to: '/wizard' },
            ]
        }
    ];

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    let meta = breadcrumb.find((obj) => {
        return obj.path === location.pathname;
    });


    const onDocumentClick = () => {
        if (!topbarItemClick) {
            setActiveTopbarItem(null);
            setTopbarMenuActive(false);
        }

        if (!menuClick) {
            if (isHorizontal() || isSlim()) {
                setMenuActive(false);
            }
            hideOverlayMenu();
        }

        if (!inlineMenuClick && profileMode === 'inline' && isSlim() && !isMobile()) {
            setInlineMenuActive(false);
        }

        if (configActive && !configClick) {
            setConfigActive(false);
        }

        inlineMenuClick = false;
        configClick = false;
        topbarItemClick = false;
        menuClick = false;
    };

    const onMenuitemClick = (event) => {
        if (!event.item.items) {
            hideOverlayMenu();

            if (isSlim() || isHorizontal()) {
                setMenuActive(false);
            }
        }
    };

    const onRootMenuitemClick = () => {
        setMenuActive((prevMenuActive) => !prevMenuActive);
    };

    const onMenuClick = () => {
        menuClick = true;

        if (inlineMenuActive && !inlineMenuClick) {
            setInlineMenuActive(false);
        }
    };

    const isMenuVisible = () => {
        if (isDesktop()) {
            if (menuMode === 'static') return !staticMenuDesktopInactive;
            else if (menuMode === 'overlay') return overlayMenuActive;
            else return true;
        } else {
            return true;
        }
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarMenuActive(false);

        if (isOverlay() && !isMobile()) {
            setOverlayMenuActive((prevOverlayMenuActive) => !prevOverlayMenuActive);
        } else {
            if (isDesktop()) {
                setStaticMenuDesktopInactive((prevStaticMenuDesktopInactive) => !prevStaticMenuDesktopInactive);
            } else {
                setStaticMenuMobileActive((prevStaticMenuMobileActive) => !prevStaticMenuMobileActive);
            }
        }

        event.preventDefault();
    };

    const onProfileButtonClick = (event) => {
        setInlineMenuActive((prevInlineMenuActive) => !prevInlineMenuActive);
        inlineMenuClick = true;

        if (isSlim() || isHorizontal()) {
            setMenuActive(false);
        }
    };

    const onTopbarMenuButtonClick = (event) => {
        topbarItemClick = true;
        setTopbarMenuActive((prevTopbarMenuActive) => !prevTopbarMenuActive);

        hideOverlayMenu();

        event.preventDefault();
    };

    const onTopbarItemClick = (event, item) => {
        topbarItemClick = true;

        if (activeTopbarItem === item) {
            setActiveTopbarItem(null);
        } else {
            setActiveTopbarItem(item);
        }

        event.preventDefault();
    };

    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false);
    };

    const isDesktop = () => {
        return window.innerWidth > 896;
    };

    const isMobile = () => {
        return window.innerWidth <= 896;
    };

    const isOverlay = () => {
        return menuMode === 'overlay';
    };

    const isHorizontal = () => {
        return menuMode === 'horizontal';
    };

    const isSlim = () => {
        return menuMode === 'slim';
    };

    const isStatic = () => {
        return menuMode === 'static';
    };

    const hasInlineProfile = profileMode === 'inline' && !isHorizontal();

    const containerClassName = classNames('layout-wrapper', {
        'layout-static': isStatic(),
        'layout-overlay': isOverlay(),
        'layout-overlay-active': overlayMenuActive,
        'layout-horizontal': isHorizontal(),
        'layout-slim': isSlim(),
        'layout-static-inactive': staticMenuDesktopInactive,
        'layout-mobile-active': staticMenuMobileActive,
        'layout-menu-dark': darkMenu,
        'layout-menu-light': !darkMenu,
    });

    const menuContainerClassName = classNames('layout-menu-container', { 'layout-menu-container-inactive': !isMenuVisible() });

    return (
        <div className={containerClassName} onClick={onDocumentClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <AppTopbar
                topbarMenuActive={topbarMenuActive}
                activeTopbarItem={activeTopbarItem}
                onMenuButtonClick={onMenuButtonClick}
                onTopbarMenuButtonClick={onTopbarMenuButtonClick}
                onTopbarItemClick={onTopbarItemClick}
                isHorizontal={isHorizontal()}
                profileMode={profileMode}
                isMobile={isMobile}
            />

            <div className={menuContainerClassName} onClick={onMenuClick}>
                <div className="layout-menu-logo">
                    <button className="p-link" onClick={() => navigate('/')}>
                        <img id="layout-menu-logo" src={logo} library="babylon-layout" alt="babylon-logo" />
                    </button>
                </div>
                <div className="layout-menu-wrapper">
                    <div className="menu-scroll-content">
                        {hasInlineProfile && <AppInlineProfile inlineMenuActive={inlineMenuActive} onProfileButtonClick={onProfileButtonClick} />}
                        <AppMenu model={menu} menuMode={menuMode} active={menuActive} onMenuitemClick={onMenuitemClick} onRootMenuitemClick={onRootMenuitemClick} />
                    </div>
                </div>
            </div>

            <div className="layout-main">
                <AppBreadcrumb meta={meta} />

                <div className="layout-content">
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/userCadastro" element={<UserCadastro />} />
                        {/* <Route path="/invoice" element={<Recibos />} /> */}
                        <Route path="/cadastro" element={<Cadastro />} />
                        <Route path="/alteraSenha" element={<AlteraSenha />} />
                        <Route path="/agenda" element={<Agenda />} />
                        <Route path="/pessoa_fisica" element={<CrudDemo />}/>
                        <Route path='/titulos_em_aberto' element={<TitulosEmAberto />} />
                        <Route path='/tipo_documento' element={<TiposDocumento />}/>
                    </Routes>
                </div>

                <AppFooter />
            </div>

            {staticMenuMobileActive && <div className="layout-mask"></div>}
        </div>
    );
};

export default App;
