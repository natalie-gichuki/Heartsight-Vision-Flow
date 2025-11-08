import axios from 'axios';
import { API_URL } from '../../config';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// ✅ Attach token automatically to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // or 'access_token' depending on your login response
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


// ✅ Get user profile function
const getUserProfile = async () => {
    try {
        const response = await api.get(`/user/profile`);
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message || 'Failed to fetch user profile.';
        throw new Error(message);
    }
};

// ✅ Update user profile function
// ✅ Update user profile function (fixed)
const updateUserProfile = async (profileData) => {
    try {
        const token = localStorage.getItem('token'); // or however you store it
        console.log("PROFILE DATA BEING SENT:", profileData);

        const response = await axios.put(
            `https://heartsight-vision-flow.onrender.com/user/profile`,
            profileData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message || 'Failed to update user profile.';
        throw new Error(message);
    }
};



// ✅ Delete user account function
const deleteUserAccount = async (userId) => {
    try {
        const response = await api.delete(`/user/profile/${userId}`);
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message || 'Failed to delete user account.';
        throw new Error(message);
    }
};

export const userService = {
    getUserProfile,
    updateUserProfile,
    deleteUserAccount,
};

export default userService; 