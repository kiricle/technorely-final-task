import { Navigate } from 'react-router-dom';
import { Button } from '../../ui/Button/Button';
import { Input } from '../../ui/Input/Input';
import styles from './ProfilePage.module.scss';
import { useProfile } from './useProfile';

export const ProfilePage = () => {
    const { isAuth, user, handleSubmit, onSubmit, register } = useProfile();

    if (!isAuth) {
        return <Navigate to={'/sign-in'} />;
    }

    return (
        <main className={styles.main}>
            {user && (
                <form
                    className={styles.form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        content="email"
                        name="email"
                        type="email"
                        register={register}
                        defaultValue={user?.email}
                    />
                    <Input
                        content="first name"
                        name="firstName"
                        register={register}
                        defaultValue={user?.firstName}
                    />
                    <Input
                        content="last name"
                        name="lastName"
                        register={register}
                        defaultValue={user?.lastName}
                    />
                    <Input
                        content="nickname"
                        name="nickname"
                        register={register}
                        defaultValue={user?.nickname}
                    />
                    <Input
                        content="position"
                        name="position"
                        register={register}
                        defaultValue={user?.position}
                    />
                    <Input
                        content="phone number"
                        name="phoneNumber"
                        register={register}
                        type="tel"
                        defaultValue={user?.phoneNumber}
                    />
                    <Button appearance="primary">Save</Button>
                </form>
            )}
        </main>
    );
};
