import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

    const login = (token) => {
        setToken(token);
        setIsAuthenticated(true);
        localStorage.setItem('authToken', token);
    }

    const logout = () => {
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('authToken');
    }

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}