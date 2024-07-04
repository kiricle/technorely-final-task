import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { userService } from '../../services/user.service';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Notify } from 'notiflix';

export const useProfile = () => {
    const { isAuth } = useAuth();

    const { data: user, refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: () => userService.getProfile(),
    });

    const { mutate } = useMutation({
        mutationKey: ['profile'],
        mutationFn: (data: User) => userService.updateProfile(data),
        onError: (err) => {
            console.log(err);
            Notify.failure(err.message, { clickToClose: true });
        },
        onSuccess: () => {
            refetch();
            Notify.success('Profile updated successfully', {
                clickToClose: true,
            });
        },
    });

    const { register, handleSubmit } = useForm<UpdateUser>();

    const onSubmit: SubmitHandler<UpdateUser> = (data) => {
        if (!user) return;

        const hasChanges =
            data.email !== user.email ||
            data.firstName !== user.firstName ||
            data.lastName !== user.lastName ||
            data.nickname !== user.nickname ||
            data.phoneNumber !== user.phoneNumber ||
            data.position !== user.position;

        if (!hasChanges) {
            Notify.info('You have done no changes');
            return;
        }

        mutate({ ...data, id: user.id });
    };

    return { isAuth, register, handleSubmit, onSubmit, user };
};
