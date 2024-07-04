import { FC, ReactNode, createContext, useState } from 'react';
import { getAccessToken } from '../../services/token.service';

type AuthContextState = {
    isAuth: boolean;
    toggleAuthState: () => void;
};

export const AuthContext = createContext<AuthContextState | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(Boolean(getAccessToken()));

    const toggleAuthState = () => {
        setIsAuth((prev) => !prev);
    };

    return (
        <AuthContext.Provider value={{ isAuth, toggleAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};


