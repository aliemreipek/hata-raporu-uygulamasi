import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportsList from './components/ReportsList';
import Navbar from './components/Navbar';
import NewReportForm from './components/NewReportForm';
import ReportDetails from './components/ReportDetails';
import AuthForm from './components/AuthForm';
import Profile from "./components/Profile";

function App() {
    const [token, setToken] = useState(null);

    // Uygulama ilk yüklendiğinde token'ı localStorage'dan al
    useEffect(() => {
        const savedToken = localStorage.getItem('authToken');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    // Token her değiştiğinde localStorage'a kaydet
    useEffect(() => {
        if (token) {
            localStorage.setItem('authToken', token);
        } else {
            localStorage.removeItem('authToken');
        }
    }, [token]);

    return (
        <Router>
            {token && <Navbar setToken={setToken} />} {/* Giriş yaptıktan sonra Navbar gösterilir */}
            <Routes>
                {!token ? (
                    <Route path="/" element={<AuthForm setToken={setToken} />} />
                ) : (
                    <>
                        <Route path="/" element={<ReportsList setToken={setToken} />} />
                        <Route path="/reports/new" element={<NewReportForm token={token} />} />
                        <Route path="/reports/:id" element={<ReportDetails />} />
                        <Route path="/profile" element={<Profile token={token} />} />
                    </>
                )}
                {/* Eğer hiçbir route eşleşmezse kullanıcıyı yönlendir */}
                <Route path="*" element={<h1>Sayfa Bulunamadı</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
