import React, { useState, useEffect } from 'react';
import { fetchUserReports } from '../services/api';
import { Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Alert, Paper, Typography } from '@mui/material';

function Profile({ token }) {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getReports = async () => {
            try {
                const response = await fetchUserReports(token);
                setReports(response.data);
            } catch (err) {
                setError('Raporlar alınamadı.');
            } finally {
                setIsLoading(false);
            }
        };

        getReports();
    }, [token]);

    if (isLoading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Paper sx={{ maxWidth: '90%', margin: '20px auto', padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Profilim
            </Typography>
            <Typography variant="h6" gutterBottom>
                Gönderdiğim Raporlar
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Başlık</TableCell>
                        <TableCell>Açıklama</TableCell>
                        <TableCell>Öncelik</TableCell>
                        <TableCell>Durum</TableCell>
                        <TableCell>Oluşturulma Tarihi</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reports.map((report) => (
                        <TableRow key={report._id}>
                            <TableCell>{report.title}</TableCell>
                            <TableCell>{report.description}</TableCell>
                            <TableCell>{report.priority}</TableCell>
                            <TableCell>{report.status}</TableCell>
                            <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default Profile;
