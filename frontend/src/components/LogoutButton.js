import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton({ setToken }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(null); // Token'ı sıfırla
        localStorage.removeItem('authToken'); // Token'ı localStorage'dan kaldır
        navigate('/'); // Kullanıcıyı giriş sayfasına yönlendir
    };

    return (
        <button onClick={handleLogout} style={{ margin: '10px', padding: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Çıkış Yap
        </button>
    );
}

export default LogoutButton;
