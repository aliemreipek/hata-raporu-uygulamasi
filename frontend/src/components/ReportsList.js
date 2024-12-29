import React, { useState, useEffect } from 'react';
import { fetchReports } from '../services/api';
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button, Paper, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutButton from "./LogoutButton";

function ReportsList({ setToken }) {
    const [reports, setReports] = useState([]);
    const [statusFilter, setStatusFilter] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFilteredReports = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetchReports({
                    status: statusFilter.join(','),
                    sortBy,
                });
                setReports(response.data);
            } catch (err) {
                console.error(err);
                setError('Hata raporları alınamadı.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchFilteredReports();
    }, [statusFilter, sortBy]);

    if (isLoading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (

        <div>
            <Paper sx={{ maxWidth: '90%', margin: '20px auto', padding: '20px' }}>
            {/* Logout Button */}
            <LogoutButton setToken={setToken} />

            <Button
                style={{ margin: '10px', padding: '10px', backgroundColor: '#0066FF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                onClick={() => navigate('/profile')}
            >
                Profilim
            </Button>


            <h2>Hata Raporları</h2>
            <FormControl fullWidth>
                <InputLabel>Durum</InputLabel>
                <Select
                    multiple
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    label="Durum"
                >
                    <MenuItem value="Açık">Açık</MenuItem>
                    <MenuItem value="Kapalı">Kapalı</MenuItem>
                    <MenuItem value="Çözüldü">Çözüldü</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth style={{marginTop: '1rem'}}>
                <InputLabel>Sırala</InputLabel>
                <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sırala"
                >
                    <MenuItem value="">Varsayılan</MenuItem>
                    <MenuItem value="priority">Öncelik (Artan)</MenuItem>
                    <MenuItem value="-priority">Öncelik (Azalan)</MenuItem>
                    <MenuItem value="createdAt">Tarih (Artan)</MenuItem>
                    <MenuItem value="-createdAt">Tarih (Azalan)</MenuItem>
                </Select>
            </FormControl>

            {isLoading ? (
                <CircularProgress/>
            ) : error ? (
                <p>{error}</p>
            ) : (
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
                            <TableRow
                                key={report._id}
                                onClick={() => navigate(`/reports/${report._id}`)}
                                style={{cursor: 'pointer'}}
                            >
                                <TableCell>{report.title}</TableCell>
                                <TableCell>{report.description}</TableCell>
                                <TableCell>{report.priority}</TableCell>
                                <TableCell>{report.status}</TableCell>
                                <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/reports/new')}
                sx={{marginBottom: '1rem'}}
            >
                Yeni Rapor Ekle
            </Button>
            </Paper>
        </div>
    );
    }
    export default ReportsList;