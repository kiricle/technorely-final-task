import { useMutation } from '@tanstack/react-query';
import { Notify } from 'notiflix';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/auth.service';
import { Button } from '../../ui/Button/Button';
import { Input } from '../../ui/Input/Input';
import styles from './SignInForm.module.scss';

export const SignInForm = () => {
    const navigate = useNavigate();

    const { toggleAuthState } = useAuth();

    const { mutate } = useMutation({
        mutationKey: ['sign-in'],
        mutationFn: (data: SignInForm) => authService.signIn(data),
        onError: (err) => {
            Notify.failure(err.message);
        },
        onSuccess: () => {
            navigate('/private');
            toggleAuthState();
        },
    });

    const { register, handleSubmit } = useForm<SignUpForm>();

    const onSubmit: SubmitHandler<SignUpForm> = (data) => {
        mutate(data);
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className={styles.heading}>Sign In</h2>
            <div className={styles.content}>
                <Input
                    register={register}
                    content="email"
                    name="email"
                    type="email"
                />
                <Input
                    register={register}
                    content="password"
                    name="password"
                    type="password"
                />
            </div>
            <Button
                style={{ width: '100%' }}
                appearance="primary"
            >
                Sign in
            </Button>
        </form>
    );
};
