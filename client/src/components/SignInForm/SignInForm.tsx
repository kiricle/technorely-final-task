import { Button } from '../../ui/Button/Button';
import { Input } from '../../ui/Input/Input';
import styles from './SignInForm.module.scss';
import { useSignIn } from './useSignIn';

export const SignInForm = () => {
    const { handleSubmit, onSubmit, register } = useSignIn();

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
