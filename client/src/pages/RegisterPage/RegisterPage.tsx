import { Navigate } from 'react-router-dom';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import { useAuth } from '../../hooks/useAuth';

export const RegisterPage = () => {
    const { isAuth } = useAuth();

    if (isAuth) {
        return <Navigate to={'/companies'} />;
    }

    return (
        <main
            style={{
                display: 'grid',
                placeContent: 'center',
                marginTop: '100px',
            }}
        >
            <RegisterForm />
        </main>
    );
};
