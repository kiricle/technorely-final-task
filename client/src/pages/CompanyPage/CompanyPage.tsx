import { useMutation, useQuery } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';
import { companyService } from '../../services/company.service';
import { Input } from '../../ui/Input/Input';
import styles from './CompanyPage.module.scss';
import { Button } from '../../ui/Button/Button';
import { useAuth } from '../../hooks/useAuth';
import { Notify } from 'notiflix';

export const CompanyPage = () => {
    const { isAuth } = useAuth();

    const params = useParams<{
        name: string;
    }>();

    const {
        data: company,
        isFetching,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['company', params.name],
        queryFn: () => {
            if (params.name === undefined) return null;
            return companyService.getCompany(params.name);
        },
    });

    const { mutate } = useMutation({
        mutationKey: ['company', params.name],
        mutationFn: (dto: UpdateCompany) => {
            return companyService.updateCompany(dto);
        },
        onSuccess: () => {
            Notify.success('Company has been updated', { clickToClose: true });
            refetch();
        },
        onError: (err) => console.log(err),
    });

    const { register, handleSubmit } = useForm<CreateCompanyForm>();

    if (!isAuth) {
        return <Navigate to={'/sign-in'} />;
    }

    if (isFetching) {
        return <h2>Fetching</h2>;
    }

    if (isError) {
        return <h2>{error.message}</h2>;
    }

    const onSubmit: SubmitHandler<CreateCompanyForm> = (data) => {
        if (!company) return;

        const hasChanges =
            data.address !== company?.address ||
            data.description !== company.description ||
            data.name !== company.name ||
            Number(data.numberOfEmployees) !== company.numberOfEmployees ||
            data.type !== company.type ||
            data.serviceOfActivity !== company.serviceOfActivity;

        if (!hasChanges) {
            Notify.info('You have changed nothing', { clickToClose: true });
            return;
        }

        mutate({
            ...data,
            id: company.id,
            numberOfEmployees: Number(data.numberOfEmployees),
        });
    };

    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
