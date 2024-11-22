'use client';
import { createContext, useState, useContext, useEffect } from 'react';
import getCurrentUser from "@/actions/action";

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const user = await getCurrentUser(); 
            setCurrentUser(user);
        };
        fetchCurrentUser();
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};
