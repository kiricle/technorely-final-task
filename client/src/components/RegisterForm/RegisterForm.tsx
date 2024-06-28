import { Button } from '../../ui/Button/Button';
import { Input } from '../../ui/Input/Input';
import styles from './RegisterForm.module.scss';

export const RegisterForm = () => {
    return (
        <form className={styles.form}>
            <h2 className={styles.heading}>Sign Up</h2>
            <div className={styles.content}>
                <Input
                    content="Email"
                    name="email"
                />
                <Input
                    content="Password"
                    name="password"
                />
                <Input
                    content="First name"
                    name="firstName"
                />
                <Input
                    content="last name"
                    name="lastName"
                />
                <Input
                    content="nickname"
                    name="nickname"
                />
                <Input
                    content="position"
                    name="position"
                />
                <Input
                    content="phone number"
                    name="phoneNumber"
                    type="tel"
                />
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
