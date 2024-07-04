import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export const Portal = ({
    children,
    target,
}: {
    children: ReactNode;
    target: string;
}) => {
    return createPortal(children, document.querySelector(target)!);
};
