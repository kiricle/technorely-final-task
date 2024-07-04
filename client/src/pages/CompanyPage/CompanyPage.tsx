import { Navigate } from 'react-router-dom';
import { Button } from '../../ui/Button/Button';
import { Input } from '../../ui/Input/Input';
import styles from './CompanyPage.module.scss';
import { useCompany } from './useCompany';

export const CompanyPage = () => {
    const {
        company,
        error,
        handleSubmit,
        isAuth,
        isError,
        isFetching,
        onSubmit,
        register,
    } = useCompany();

    if (!isAuth) {
        return <Navigate to={'/sign-in'} />;
    }

    if (isFetching) {
        return <h2>Fetching</h2>;
    }

    if (isError && error) {
        return <h2>{error.message}</h2>;
    }

    return (
        <main className={styles.main}>
            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    name="name"
                    content="name"
                    register={register}
                    defaultValue={company?.name}
                />
                <Input
                    name="description"
                    content="description"
                    register={register}
                    defaultValue={company?.description}
                />
                <Input
                    name="serviceOfActivity"
                    content="service Of Activity"
                    register={register}
                    defaultValue={company?.serviceOfActivity}
                />
                <Input
                    type="number"
                    name="numberOfEmployees"
                    content="number of employees"
                    register={register}
                    defaultValue={company?.numberOfEmployees}
                />
                <Input
                    name="type"
                    content="type"
                    register={register}
                    defaultValue={company?.type}
                />
                <Input
                    name="address"
                    content="address"
                    register={register}
                    defaultValue={company?.address}
                />
                <Button appearance="primary">Save</Button>
            </form>
        </main>
    );
};
