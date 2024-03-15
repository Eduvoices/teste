import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import App from './App';
import { Login } from './pages/Login';
import Access from './pages/Access';
import Recibos from './pages/Recibos';
import FirstAccess from './pages/Erro';
import LandingPage from './pages/Landing';
import ThankYouPage from './pages/ThankYou';

const AppWrapper = () => {
    let location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<App />} />
            <Route path='/denied' element={<Access />}/>
            <Route path="/invoice" element={<Recibos />} />
            <Route path='/firstAccess' element={<FirstAccess />}/>
            <Route path='/' element={<LandingPage />} />
            <Route path='/thankYou' element={<ThankYouPage />}/>
        </Routes>
    );
};

export default AppWrapper;
