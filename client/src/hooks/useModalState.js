import {useState} from 'react';

export const useModalState = defaultVal => {
    const [isOpen, setVisibility] = useState(defaultVal);
    const open = () => setVisibility(true);
    const close = () => setVisibility(false);

    return [
        isOpen,
        open,
        close,
    ];
};
