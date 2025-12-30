import { createContext, useState } from 'react';
import api from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

    const login = (token, refreshToken) => {
        setToken(token);
        setIsAuthenticated(true);
        localStorage.setItem('authToken', token);
        localStorage.setItem('refreshToken', refreshToken);
    }

    const logout = async () => {
        setToken(null);
        setIsAuthenticated(false);

        const refreshToken = localStorage.getItem('refreshToken');

        await api.post('/auth/logout', { refreshToken });
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');

        window.location.href = '/';
    }

    const logoutAll = async () => {
        setToken(null);
        setIsAuthenticated(false);

        const refreshToken = localStorage.getItem('refreshToken');

        await api.post('/auth/logout-all', { refreshToken });
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');

        window.location.href = '/';
    }

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout, logoutAll }}>
            {children}
        </AuthContext.Provider>
    )
}