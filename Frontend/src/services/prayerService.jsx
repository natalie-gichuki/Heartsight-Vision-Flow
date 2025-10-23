import axios from "axios";

const API_URL = "http://localhost:5555/prayers"; // replace with your backend URL

const getPrayers = async (token) => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

const getPrayer = async (id, token) => {
    const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

const addPrayer = async (data, token) => {
    const response = await axios.post(API_URL, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

const updatePrayer = async (id, data, token) => {
    const response = await axios.put(`${API_URL}/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

const deletePrayer = async (id, token) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export default {
    getPrayers,
    getPrayer,
    addPrayer,
    updatePrayer,
    deletePrayer,
};
