// src/context/AuthContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

type AuthContextType = {
    user: any;
    login: (userData: any) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<any>(null);

    const login = (userData: any) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
