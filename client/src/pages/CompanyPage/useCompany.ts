import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { companyService } from '../../services/company.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Notify } from 'notiflix';
import { SubmitHandler, useForm } from 'react-hook-form';

export const useCompany = () => {
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

    return {
        register,
        handleSubmit,
        onSubmit,
        company,
        isError,
        isFetching,
        error,
        isAuth,
    };
};
