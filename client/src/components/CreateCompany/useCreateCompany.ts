import { SubmitHandler, useForm } from 'react-hook-form';
import { useModal } from '../../hooks/useModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { companyService } from '../../services/company.service';
import { Notify } from 'notiflix';

export const useCreateCompany = () => {
    const { close, show, visible } = useModal();

    const { register, handleSubmit } = useForm<CreateCompanyForm>();

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationKey: ['company'],
        mutationFn: (data: CreateCompany) => companyService.createCompany(data),
        onError: (err) => {
            Notify.failure(err.message, {
                clickToClose: true,
            });
        },
        onSuccess: () =>
            queryClient.refetchQueries({
                queryKey: ['companies'],
            }),
    });

    const onSubmit: SubmitHandler<CreateCompanyForm> = (data) => {
        if (
            data.address === '' ||
            data.description === '' ||
            data.name === '' ||
            data.numberOfEmployees === '' ||
            data.serviceOfActivity === '' ||
            data.type === ''
        ) {
            Notify.failure('You have not filled all fields!', {
                clickToClose: true,
            });
            return;
        }

        if (isNaN(Number(data.numberOfEmployees))) {
            Notify.failure('Number of employee must be a number', {
                clickToClose: true,
            });
            return;
        }

        mutate({ ...data, numberOfEmployees: Number(data.numberOfEmployees) });
        close();
    };

    return {
        close,
        visible,
        show,
        onSubmit,
        register,
        handleSubmit,
    };
};
