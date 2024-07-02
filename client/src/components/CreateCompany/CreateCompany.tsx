import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Notify } from 'notiflix';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useModal } from '../../hooks/useModal';
import { companyService } from '../../services/company.service';
import { Input } from '../../ui/Input/Input';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import styles from './CreateCompany.module.scss';
import { Button } from '../../ui/Button/Button';

export const CreateCompany = () => {
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

    return (
        <>
            <Button
                appearance="primary"
                onClick={show}
            >
                Create Company
            </Button>

            <ModalWindow
                onClose={close}
                title="Create Company"
                visible={visible}
                onSubmit={handleSubmit(onSubmit)}
            >
                <form className={styles.form}>
                    <Input
                        name="name"
                        content="Name"
                        register={register}
                    />
                    <Input
                        name="address"
                        content="address"
                        register={register}
                    />
                    <Input
                        name="type"
                        content="type"
                        register={register}
                    />
                    <Input
                        name="serviceOfActivity"
                        content="Service of activity"
                        register={register}
                    />
                    <Input
                        name="numberOfEmployees"
                        content="Number of Employees"
                        register={register}
                        type="number"
                    />
                    <Input
                        name="description"
                        content="description"
                        register={register}
                    />
                </form>
            </ModalWindow>
        </>
    );
};
