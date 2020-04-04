import {useState} from 'react';

import {useModalState} from '@/hooks/useModalState';

export const useDeleteModalState = () => {
    const [isOpen, open, close] = useModalState(false);
    const [deletedId, setDeletedId] = useState(null);

    const openDeleteModal = deletedId => {
        setDeletedId(deletedId);
        open();
    };

    return {
        closeDeleteModal: close,
        openDeleteModal,

        isDeleteModalOpened: isOpen,
        deletedId,
    };
};
