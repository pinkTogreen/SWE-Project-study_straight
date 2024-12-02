'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Use sessionStorage instead of localStorage
        const storedUser = sessionStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(storedUser);
        }
        setIsLoading(false);
    }, []);

    const logout = () => {
        setCurrentUser(null);
        sessionStorage.removeItem('currentUser');
    };

    // Show nothing while checking for stored user
    if (isLoading) {
        return null;
    }

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

