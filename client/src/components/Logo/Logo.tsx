import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

export const Logo = () => {
    return (
        <h2 className={styles.logo}>
            <Link
                className={styles.link}
                to={'/register'}
            >
                Company Manager
            </Link>
        </h2>
    );
};
