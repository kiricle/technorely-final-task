import { Button } from '../../ui/Button/Button';
import { Input } from '../../ui/Input/Input';
import styles from './RegisterForm.module.scss';
import { registerFormInputs } from './register-form-inputs';
import { useRegister } from './useRegister';

export const RegisterForm = () => {
    const { handleSubmit, onSubmit, register } = useRegister();

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
