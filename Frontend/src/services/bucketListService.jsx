import axios from "axios";

const API_URL = "http://localhost:5555'/bucketlist/items";

const getItems = async (token) => {
    const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

const addItem = async (data, token) => {
    const res = await axios.post(API_URL, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

const updateItem = async (id, data, token) => {
    const res = await axios.put(`${API_URL}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

const deleteItem = async (id, token) => {
    const res = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export default { getItems, addItem, updateItem, deleteItem };
