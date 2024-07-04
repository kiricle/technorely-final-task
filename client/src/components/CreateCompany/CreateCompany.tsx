import { Button } from '../../ui/Button/Button';
import { Input } from '../../ui/Input/Input';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import styles from './CreateCompany.module.scss';
import { useCreateCompany } from './useCreateCompany';

export const CreateCompany = () => {
    const { close, handleSubmit, onSubmit, register, show, visible } =
        useCreateCompany();

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
