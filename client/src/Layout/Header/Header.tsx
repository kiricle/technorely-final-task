import { Link } from 'react-router-dom';
import { Logo } from '../../components/Logo/Logo';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/auth.service';
import { Button } from '../../ui/Button/Button';
import styles from './Header.module.scss';

export const Header = () => {
    const { isAuth, toggleAuthState } = useAuth();

    return (
        <header className={styles.header}>
            <Logo />
            <div className={styles.buttons}>
                {!isAuth ? (
                    <>
                        <Button appearance="primary">
                            <Link to={'/sign-in'}>Sign In</Link>
                        </Button>
                        <Button appearance="secondary">
                            <Link to={'/sign-up'}>Sign Up</Link>
                        </Button>
                    </>
                ) : (
                    <Button
                        onClick={async () => {
                            if (await authService.logout()) {
                                toggleAuthState();
                            }
                        }}
                        appearance="primary"
                    >
                        Log out
                    </Button>
                )}
            </div>
        </header>
    );
};
