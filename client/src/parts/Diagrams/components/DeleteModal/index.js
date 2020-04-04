import React, {useEffect} from 'react';

import {ConfirmationModal} from '@/components';

import {withDiagramDeleting} from './containers/withDiagramDeleting';

const DeleteModal = ({
    isOpen,
    deletedId,

    diagramDeletingInProgress,
    diagramDeletingSuccess,

    deleteDiagram,
    handleClose,
}) => {
    useEffect(() => {
        if (diagramDeletingSuccess) handleClose();
    }, [diagramDeletingSuccess]);

    return (
        <ConfirmationModal
            isOpen={isOpen}
            areControlsDisabled={diagramDeletingInProgress}
            handleConfirm={() => deleteDiagram(deletedId)}
            handleReject={() => handleClose()}
        >
            {'Вы точно хотите удалить эту диаграмму?'}
        </ConfirmationModal>
    );
};

export default withDiagramDeleting(DeleteModal);
