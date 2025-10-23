import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services/userService';
import { jwtDecode } from 'jwt-decode';

const storedUser = localStorage.getItem('user');
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

const initialState = {
    user: parsedUser?.access_token ? jwtDecode(parsedUser.access_token) : null,
    loading: false,
    error: null,
};

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
    'user/fetchProfile',
    async (userId, thunkAPI) => {
        try {
            const response = await userService.getUserProfile(userId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to update user profile
export const updateUserProfile = createAsyncThunk(
    'user/updateProfile',
    async (profileData, thunkAPI) => {
        try {
            const response = await userService.updateUserProfile(profileData);
            return response;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to delete user account
export const deleteUserAccount = createAsyncThunk(
    'user/deleteAccount',
    async (userId, thunkAPI) => {
        try {
            const response = await userService.deleteUserAccount(userId);
            localStorage.removeItem('user'); // Clear user data from localStorage
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// User slice definition
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.user = { ...state.user, ...action.payload };
                state.loading = false;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUserAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUserAccount.fulfilled, (state) => {
                state.user = null; // Clear user data on account deletion
                state.loading = false;
            })
            .addCase(deleteUserAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export the actions and reducer
export const userActions = userSlice.actions;
export default userSlice.reducer;

