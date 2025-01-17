import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';


export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('useAuth has to be used within <AuthProvider>');
    }

    return authContext;
};
