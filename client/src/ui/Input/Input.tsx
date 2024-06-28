import { InputHTMLAttributes } from 'react';
// import { UseFormRegister } from 'react-hook-form';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    content: string;
    // register: UseFormRegister<any>;
    name: string;
}

export const Input = ({
    name,
    type,
    content,
    // register,
    className,
    ...props
}: InputProps) => {
    return (
        <label
            className={[styles.label, className].join(' ')}
            htmlFor={name}
        >
            {content}
            <input
                // {...register(name)}
                className={styles.input}
                id={name}
                type={type}
                {...props}
            />
        </label>
    );
};
