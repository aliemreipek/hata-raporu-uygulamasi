import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/api';
import { TextField, Button, Box, Alert } from '@mui/material';

function AuthForm({ setToken }) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = { username, password };
            const response = isLogin
                ? await loginUser(userData)
                : await registerUser(userData);

            if (isLogin) {
                setToken(response.data.token);
                setMessage('Giriş başarılı!');
            } else {
                setMessage('Kayıt başarılı, giriş yapabilirsiniz.');
            }
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || 'Bir hata oluştu.');
            setMessage('');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
            <h2>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</h2>
            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                label="Kullanıcı Adı"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Şifre"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <Button type="submit" variant="contained" fullWidth>
                {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
            </Button>
            <Button
                variant="text"
                onClick={() => setIsLogin(!isLogin)}
                fullWidth
                sx={{ mt: 1 }}
            >
                {isLogin ? 'Hesabınız yok mu? Kayıt Olun' : 'Hesabınız var mı? Giriş Yapın'}
            </Button>
        </Box>
    );
}

export default AuthForm;
