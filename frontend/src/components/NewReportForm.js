import React, { useState } from 'react';
import { createReport } from '../services/api';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box, Alert, Paper, Typography } from '@mui/material';

function NewReportForm({ token }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('Açık');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createReport({ title, description, priority, status, token });
            setSuccessMessage('Hata raporu başarıyla oluşturuldu!');
            setTitle('');
            setDescription('');
            setPriority('');
            setStatus('Açık');
            setErrorMessage('');
        } catch (error) {
            console.error(error);
            setErrorMessage('Hata raporu oluşturulamadı.');
            setSuccessMessage('');
        }
    };

    return (
        <Paper sx={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Yeni Hata Raporu Ekle
            </Typography>
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                    label="Başlık"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Açıklama"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Öncelik</InputLabel>
                    <Select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                    >
                        <MenuItem value="Düşük">Düşük</MenuItem>
                        <MenuItem value="Orta">Orta</MenuItem>
                        <MenuItem value="Yüksek">Yüksek</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Durum</InputLabel>
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value="Açık">Açık</MenuItem>
                        <MenuItem value="Kapalı">Kapalı</MenuItem>
                        <MenuItem value="Çözüldü">Çözüldü</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Gönder
                </Button>
            </Box>
        </Paper>
    );
}

export default NewReportForm;
