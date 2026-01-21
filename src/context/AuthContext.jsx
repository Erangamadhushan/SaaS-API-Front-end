import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('accessToken'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));

    useEffect(() => {
        const fetchCsrf = async () => {
            const res = await api.get("/csrf-token");
            localStorage.setItem("csrfToken", res.data.csrfToken);
        };

        fetchCsrf();
    }, []);

    const login = (token) => {
        setToken(token);
        setIsAuthenticated(true);
        localStorage.setItem("accessToken", token);
    }

    const logout = async () => {
        setToken(null);
        setIsAuthenticated(false);

        await api.post('/auth/logout');
        localStorage.removeItem('accessToken');

        window.location.href = '/';
    }

    const logoutAll = async () => {
        setToken(null);
        setIsAuthenticated(false);

        await api.post('/auth/logout-all');
        localStorage.removeItem('accessToken');

        window.location.href = '/';
    }

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout, logoutAll }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}