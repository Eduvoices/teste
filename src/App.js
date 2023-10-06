import React, { useState, useRef, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import AppTopbar from './AppTopbar';
import AppFooter from './AppFooter';
import AppConfig from './AppConfig';
import AppMenu from './AppMenu';
import AppBreadcrumb from './AppBreadcrumb';
import AppInlineProfile from './AppInlineProfile';

import Dashboard from './components/Dashboard';
// import FormLayoutDemo from './components/FormLayoutDemo';
// import InputDemo from './components/InputDemo';
// import FloatLabelDemo from './components/FloatLabelDemo';
// import InvalidStateDemo from './components/InvalidStateDemo';
// import ButtonDemo from './components/ButtonDemo';
// import TableDemo from './components/TableDemo';
// import ListDemo from './components/ListDemo';
// import TreeDemo from './components/TreeDemo';
// import PanelDemo from './components/PanelDemo';
// import OverlayDemo from './components/OverlayDemo';
// import MediaDemo from './components/MediaDemo';
// import MenuDemo from './components/MenuDemo';
// import MessagesDemo from './components/MessagesDemo';
// import FileDemo from './components/FileDemo';
// import ChartDemo from './components/ChartDemo';
// import MiscDemo from './components/MiscDemo';
// import Documentation from './components/Documentation';
// import IconsDemo from './utilities/IconsDemo';
// import BlocksDemo from './components/BlocksDemo';
import CalendarDemo from './pages/CalendarDemo';
import Consulta from './pages/Consulta';
import Invoice from './pages/Invoice';
import UserCadastro from './pages/UserCadastro';
import Cadastro from './pages/Cadastro';
import AlteraSenha from './pages/AlteraSenha';
import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import logo from '../src/assets/logo-white.png'

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';
import './layout-blue.css'
import './theme-blue.css'

const App = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [menuMode, setMenuMode] = useState('static');
    const [darkMenu, setDarkMenu] = useState(true);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [topbarMenuActive, setTopbarMenuActive] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [activeTopbarItem, setActiveTopbarItem] = useState(null);
    const [inlineMenuActive, setInlineMenuActive] = useState(false);
    const [profileMode, setProfileMode] = useState('popup');
    const [configActive, setConfigActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();

    const navigate = useNavigate();

    let menuClick = false;
    let configClick = false;
    let topbarItemClick = false;
    let inlineMenuClick = false;

    const breadcrumb = [
        { path: '/dashboard', parent: 'Dashboard', label: 'Painel' },
        // { path: '/formlayout', parent: 'UI Kit', label: 'Form Layout' },
        // { path: '/input', parent: 'UI Kit', label: 'Input' },
        // { path: '/floatlabel', parent: 'UI Kit', label: 'Float Label' },
        // { path: '/invalidstate', parent: 'UI Kit', label: 'Invalid State' },
        // { path: '/button', parent: 'UI Kit', label: 'Button' },
        // { path: '/table', parent: 'UI Kit', label: 'Table' },
        // { path: '/list', parent: 'UI Kit', label: 'List' },
        // { path: '/tree', parent: 'UI Kit', label: 'Tree' },
        // { path: '/panel', parent: 'UI Kit', label: 'Panel' },
        // { path: '/overlay', parent: 'UI Kit', label: 'Overlay' },
        // { path: '/media', parent: 'UI Kit', label: 'Media' },
        // { path: '/menu', parent: 'UI Kit', label: 'Menu' },
        // { path: '/menu/seat', parent: 'UI Kit', label: 'Menu' },
        // { path: '/menu/payment', parent: 'UI Kit', label: 'Menu' },
        // { path: '/menu/confirmation', parent: 'UI Kit', label: 'Menu' },
        // { path: '/messages', parent: 'UI Kit', label: 'Messages' },
        // { path: '/file', parent: 'UI Kit', label: 'File' },
        // { path: '/chart', parent: 'UI Kit', label: 'Charts' },
        // { path: '/misc', parent: 'UI Kit', label: 'Misc' },
        // { path: '/icons', parent: 'Utilities', label: 'Icons' },
        // { path: '/blocks', parent: 'PrimeBlocks', label: 'Blocks' },
        { path: '/userCadastro', parent: 'Utilities', label: 'Cadastro de Usuário' },
        { path: '/calendar', parent: 'PrimeBlocks', label: 'Agenda' },
        { path: '/consulta', parent: 'Pages', label: 'Consulta' },
        { path: '/invoice', parent: 'Pages', label: 'recibos' },
        { path: '/cadastro', parent: 'Pages', label: 'Cadastro' },
        { path: '/alteraSenha', parent: 'Pages', label: 'Alterar Senha' },
        // { path: '/documentation', parent: 'Pages', label: 'Documentation' }
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
                // { label: 'Cadastro de Usuário', icon: 'pi pi-fw pi-pencil', to: '/userCadastro' },
                { label: 'Agenda', icon: 'pi pi-fw pi-calendar-plus', to: '/calendar' },
                { label: 'Consulta', icon: 'pi pi-fw pi-search', to: '/consulta' },
                // { label: 'Landing', icon: 'pi pi-fw pi-user-plus', url: 'assets/pages/landing.html', target: '_blank' },
                { label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/' },
                // { label: 'Invoice', icon: 'pi pi-fw pi-lock', to: '/invoice' },
                // { label: 'Cadastro', icon: 'pi pi-fw pi-user-plus', to: '/cadastro' },
                // { label: 'Wizard', icon: 'pi pi-fw pi-star-fill', to: '/wizard' },
                // { label: 'Error', icon: 'pi pi-fw pi-times-circle', to: '/error' },
                // { label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', to: '/notfound' },
                // { label: 'Access Denied', icon: 'pi pi-fw pi-lock', to: '/access' },
                { label: 'Alterar Senha', icon: 'pi pi-fw pi-lock', to: '/alteraSenha' },
                {label: 'Recibos', icon: 'pi pi-fw pi-dollar', to: '/invoice'},
                {
                    label: 'Cadastro',
                    icon: 'pi pi-fw pi-folder',
                    items: [
                        { label: 'Cadastro de Pessoa Física', icon: 'pi pi-fw pi-user', to: '/cadastro'},
                        { label: 'Cadastro de Usuário', icon: 'pi pi-fw pi-user-plus', to: '/userCadastro' },
                    ]
                }
            ]
        }
    ];

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    let meta = breadcrumb.find((obj) => {
        return obj.path === location.pathname;
    });

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRippleChange = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onMenuModeChange = (e) => {
        setMenuMode(e.value);
        setStaticMenuDesktopInactive(false);
        setOverlayMenuActive(false);

        if (e.value === 'horizontal') {
            setProfileMode('popup');
        }
    };

    const onMenuColorChange = (e) => {
        setDarkMenu(e.value);
    };

    const onProfileChange = (e) => {
        setProfileMode(e.value);
    };

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

    const onConfigClick = () => {
        configClick = true;
    };

    const onConfigButtonClick = () => {
        setConfigActive((prevConfigActive) => !prevConfigActive);
        configClick = true;
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
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': !ripple
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
                        {/* <Route path="/formlayout" element={<FormLayoutDemo />} />
                        <Route path="/input" element={<InputDemo />} />
                        <Route path="/floatlabel" element={<FloatLabelDemo />} />
                        <Route path="/invalidstate" element={<InvalidStateDemo />} />
                        <Route path="/button" element={<ButtonDemo />} />
                        <Route path="/table" element={<TableDemo />} />
                        <Route path="/list" element={<ListDemo />} />
                        <Route path="/tree" element={<TreeDemo />} />
                        <Route path="/panel" element={<PanelDemo />} />
                        <Route path="/overlay" element={<OverlayDemo />} />
                        <Route path="/media" element={<MediaDemo />} />
                        <Route path="/menu/*" element={<MenuDemo />} />
                        <Route path="/messages" element={<MessagesDemo />} />
                        <Route path="/file" element={<FileDemo />} />
                        <Route path="/chart" element={<ChartDemo />} /> */}
                        {/* <Route path="/misc" element={<MiscDemo />} /> */}
                        {/* <Route path="/icons" element={<IconsDemo />} /> */}
                        {/* <Route path="/blocks" element={<BlocksDemo />} /> */}
                        <Route path="/userCadastro" element={<UserCadastro />} />
                        <Route path="/calendar" element={<CalendarDemo />} />
                        <Route path="/consulta" element={<Consulta />} />
                        <Route path="/invoice" element={<Invoice />} />
                        <Route path="/cadastro" element={<Cadastro />} />
                        <Route path="/alteraSenha" element={<AlteraSenha />} />
                        {/* <Route path="/documentation" element={<Documentation />} /> */}
                    </Routes>
                </div>

                <AppFooter />
            </div>

            <AppConfig
                configActive={configActive}
                menuMode={menuMode}
                onMenuModeChange={onMenuModeChange}
                isDarkMenu={darkMenu}
                onMenuColorChange={onMenuColorChange}
                profileMode={profileMode}
                onProfileChange={onProfileChange}
                onConfigClick={onConfigClick}
                onConfigButtonClick={onConfigButtonClick}
                rippleActive={ripple}
                onRippleChange={onRippleChange}
                inputStyle={inputStyle}
                onInputStyleChange={onInputStyleChange}
            ></AppConfig>

            {staticMenuMobileActive && <div className="layout-mask"></div>}
        </div>
    );
};

export default App;
