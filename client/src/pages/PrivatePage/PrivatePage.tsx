import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const PrivatePage = () => {
    const { isAuth } = useAuth();

    if (!isAuth) {
        return <Navigate to={'/sign-in'} />;
    }

    return <main>PrivatePage</main>;
};
