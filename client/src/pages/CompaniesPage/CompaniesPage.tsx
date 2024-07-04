import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './CompaniesPage.module.scss';
import { UserCompaniesTable } from '../../components/UserCompaniesTable/UserCompaniesTable';
import { CreateCompany } from '../../components/CreateCompany/CreateCompany';

export const CompaniesPage = () => {
    const { isAuth } = useAuth();

    if (!isAuth) {
        return <Navigate to={'/sign-in'} />;
    }

    return (
        <main className={styles.main}>
            <CreateCompany />
            <UserCompaniesTable />
        </main>
    );
};
