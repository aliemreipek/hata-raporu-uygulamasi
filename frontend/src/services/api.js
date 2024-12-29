import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Kullanıcı kaydı
export const registerUser = async (userData) => {
    return axios.post(`${API_URL}/auth/register`, userData);
};

// Kullanıcı girişi
export const loginUser = async (userData) => {
    return axios.post(`${API_URL}/auth/login`, userData);
};

// Kullanıcının kendi raporlarını getir
export const fetchUserReports = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return axios.get(`${API_URL}/reports/my-reports`, config);
};

// Tüm hata raporlarını getir
export const fetchReports = async ({ status, sortBy, token }) => {
    const params = {};
    if (status) params.status = status;
    if (sortBy) params.sortBy = sortBy;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params,
    };

    return axios.get(`${API_URL}/reports`, config);
};

// Tek bir hata raporunu getir
export const fetchReport = async (id) => {
    const response = await axios.get(`${API_URL}/reports/${id}`);
    return response;
};


// Yeni rapor oluştur
export const createReport = async ({ title, description, priority, status, token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const data = { title, description, priority, status };

    return axios.post(`${API_URL}/reports`, data, config);
};
