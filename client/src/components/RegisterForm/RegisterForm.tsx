import { useMutation } from '@tanstack/react-query';
import { Notify } from 'notiflix';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/auth.service';
import { Button } from '../../ui/Button/Button';
import { Input } from '../../ui/Input/Input';
import styles from './RegisterForm.module.scss';
import { registerFormInputs } from './register-form-inputs';

export const RegisterForm = () => {
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

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className={styles.heading}>Sign Up</h2>
            <div className={styles.content}>
                {registerFormInputs.map(({ content, name, type }) => (
                    <Input
                        register={register}
                        key={name}
                        content={content}
                        name={name}
                        type={type || 'text'}
                    />
                ))}
            </div>
            <Button
                style={{ width: '100%' }}
                appearance="primary"
            >
                Sign up
            </Button>
        </form>
    );
};
