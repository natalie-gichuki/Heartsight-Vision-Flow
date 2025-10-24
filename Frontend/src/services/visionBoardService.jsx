import axios from "axios";

const API_URL = "https://heartsight-vision-flow.onrender.com/visionboard/boards"; // Adjust the URL as needed

const getVisions = async (token) => {
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const createVision = async (data, token) => {
    const response = await axios.post(API_URL, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const updateVision = async (id, data, token) => {
    const response = await axios.put(`${API_URL}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const deleteVision = async (id, token) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export default { getVisions, createVision, updateVision, deleteVision };
