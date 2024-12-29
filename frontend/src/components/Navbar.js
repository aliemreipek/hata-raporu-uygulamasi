import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar({ setToken }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(null); // Kullanıcı oturumunu kapat
        localStorage.removeItem('authToken'); // Token'ı kaldır
        navigate('/'); // Giriş ekranına yönlendir
    };

    return (
        <AppBar position="static" sx={{ marginBottom: '20px' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Hata Raporlama Uygulaması
                </Typography>
                <Box>
                    <Button color="inherit" onClick={() => navigate('/')}>
                        Ana Sayfa
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/profile')}>
                        Profilim
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/reports/new')}>
                        Yeni Rapor Ekle
                    </Button>
                    <Button color="inherit" onClick={handleLogout}>
                        Çıkış Yap
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
