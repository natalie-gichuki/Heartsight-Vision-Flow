import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
import userReducer from './Slice/userSlice';


// This is the Redux store configuration file
// It imports the authReducer from the authSlice file and sets up the Redux store.

const store = configureStore({
    // The reducer is set to authReducer, which handles authentication state.
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
    // devTools is enabled only in development mode for debugging purposes.
    devTools: process.env.NODE_ENV !== 'production',
});

// This exports the configured store so it can be used in the application.
export default store;