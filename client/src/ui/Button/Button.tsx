import { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Button.module.scss';

type Appearance = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    appearance: Appearance;
    className?: string;
    children: ReactNode;
}

export const Button = ({
    appearance,
    children,
    className,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={[styles.button, styles[appearance], className].join(' ')}
            {...props}
        >
            {children}
        </button>
    );
};
