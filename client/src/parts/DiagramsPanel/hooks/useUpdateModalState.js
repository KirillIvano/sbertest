import {useState} from 'react';

import {useModalState} from '@/hooks/useModalState';

export const useUpdateModalState = () => {
    const [isOpen, open, close] = useModalState(false);
    const [updatedId, setUpdatedId] = useState(null);

    const openUpdateModal = updatedId => {
        setUpdatedId(updatedId);
        open();
    };

    return {
        closeUpdateModal: close,
        openUpdateModal,

        isUpdateModalOpened: isOpen,
        updatedId,
    };
};
