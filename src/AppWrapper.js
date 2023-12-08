import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import App from './App';
import { Login } from './pages/Login';
import Access from './pages/Access';
import Recibos from './pages/Recibos';

const AppWrapper = () => {
    let location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<App />} />
            <Route path='/denied' element={<Access />}/>
            <Route path="/invoice" element={<Recibos />} />
        </Routes>
    );
};

export default AppWrapper;
