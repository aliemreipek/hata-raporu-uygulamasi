import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReport } from '../services/api';
import { CircularProgress } from '@mui/material';

function ReportDetails() {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getReport = async () => {
            try {
                const response = await fetchReport(id);
                setReport(response.data);
            } catch (err) {
                console.error(err);
                setError('Rapor alınamadı.');
            } finally {
                setIsLoading(false);
            }
        };

        getReport();
    }, [id]);

    if (isLoading) return <CircularProgress />;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Rapor Detayları</h2>
            <p><strong>Başlık:</strong> {report.title}</p>
            <p><strong>Açıklama:</strong> {report.description}</p>
            <p><strong>Öncelik:</strong> {report.priority}</p>
            <p><strong>Durum:</strong> {report.status}</p>
            <p><strong>Oluşturulma Tarihi:</strong> {new Date(report.createdAt).toLocaleDateString()}</p>
        </div>
    );
}

export default ReportDetails;
