import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/auth.service';
import { Notify } from 'notiflix';
import { SubmitHandler, useForm } from 'react-hook-form';

export const useRegister = () => {
    const { toggleAuthState } = useAuth();

    const { mutate } = useMutation({
        mutationKey: ['sign-up'],
        mutationFn: (data: SignUpForm) => authService.signUp(data),
        onError: (err) => {
            Notify.failure(err.message);
        },
        onSuccess: () => {
            toggleAuthState();
        },
    });

    const { register, handleSubmit } = useForm<SignUpForm>();

    const onSubmit: SubmitHandler<SignUpForm> = (data) => {
        mutate(data);
    };

    return {
        register,
        handleSubmit,
        onSubmit,
    };
};
