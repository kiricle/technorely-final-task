import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/auth.service';
import { Notify } from 'notiflix';
import { SubmitHandler, useForm } from 'react-hook-form';

export const useSignIn = () => {
    const { toggleAuthState } = useAuth();

    const { mutate } = useMutation({
        mutationKey: ['sign-in'],
        mutationFn: (data: SignInForm) => authService.signIn(data),
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
