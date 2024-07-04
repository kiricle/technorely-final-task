import { useEffect, useState } from 'react';

export const useModal = () => {
    const [visible, setVisible] = useState(false);

    const show = () => {
        setVisible(() => true);
    };

    const close = () => {
        setVisible(() => false);
    };

    useEffect(() => {
        document.body.style.overflow = visible ? 'hidden' : 'auto';
    }, [visible]);

    return { visible, show, close } as const;
};
