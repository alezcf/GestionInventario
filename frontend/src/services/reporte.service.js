// src/services/reportes.service.js
import axios from './root.service';
import cookies from 'js-cookie';

export const getAllReportes = async () => {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const response = await axios.get('/reportes/', { headers });
        const { status, data } = response;
        if (status === 200) {
            return data.data;
        }
    } catch (error) {
        handleError(error);
    }
};

export const getReporte = async (reporteId) => {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`/reportes/${reporteId}`, { headers });
        const { status, data } = response;
        if (status === 200) {
            return data.data;
        }
    } catch (error) {
        handleError(error);
    }
};

const handleError = (error) => {
    console.error('API call error:', error);
    throw error;
};

export default {
    getAllReportes,
    getReporte,
};
