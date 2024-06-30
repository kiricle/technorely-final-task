import { Navigate } from 'react-router-dom';
import { SignInForm } from '../../components/SignInForm/SignInForm';
import { useAuth } from '../../hooks/useAuth';

export const SignInPage = () => {
    const { isAuth } = useAuth();

    if (isAuth) {
        return <Navigate to={'/private'} />;
    }

    return (
        <main
            style={{
                display: 'grid',
                placeContent: 'center',
                marginTop: '100px',
            }}
        >
            <SignInForm />
        </main>
    );
};
