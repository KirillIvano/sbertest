import React, {useEffect, useMemo} from 'react';
import classnames from 'classnames';

import {Button, CloseIcon} from '@/components';
import {useModalState} from '@/hooks/useModalState';

import {DeleteModal, CreateModal, RenameModal, DiagramCard} from './components';
import {withDiagramsPreviews} from './containers/withDiagramsPreviews';
import {useDeleteModalState} from './hooks/useDeleteModalState';
import {useUpdateModalState} from './hooks/useUpdateModalState';
import styles from './styles.less';

const DiagramsPanel = ({
    isOpen,
    close,

    diagramsGettingInProgress,
    diagramsGettingError,
    diagrams,

    getPreviews,
    selectDiagram,
}) => {
    useEffect(() => {
        if (isOpen) {
            getPreviews();
        }
    }, [isOpen]);

    const sortedDiagrams = useMemo(
        () => [...diagrams].sort(
            (a, b) => (new Date(b.lastUpdate) - new Date(a.lastUpdate)),
        ),
        [diagrams],
    );

    const {
        isDeleteModalOpened,
        openDeleteModal,
        closeDeleteModal,
        deletedId,
    } = useDeleteModalState(false);
    const {
        isUpdateModalOpened,
        openUpdateModal,
        closeUpdateModal,
        updatedId,
    } = useUpdateModalState(false);

    const [isCreateModalOpened, openCreateModal, closeCreateModal] = useModalState(false);

    if (diagramsGettingError) {
        return (
            <div className={styles.diagramsPanel}>
                {'Ошибка, вернитесь позже'}
            </div>
        );
    }

    if (diagramsGettingInProgress) {
        return (
            <div className={styles.diagramsPanel}>
                {'Загрузка...'}
            </div>
        );
    }

    return (
        <div className={
            classnames(
                styles.diagramsPanel,
                {[styles.hidden]: !isOpen},
            )
        }>
            <div className={styles.panelControls}>
                <CloseIcon close={close} theme={'dark'} />
                <Button onClick={openCreateModal}>
                    {'Создать диаграмму'}
                </Button>
            </div>
            {
                sortedDiagrams.map(
                    ({
                        id,
                        name,
                        lastUpdate,
                    }) => (
                        <DiagramCard
                            handleDelete={() => openDeleteModal(id)}
                            handleSelect={() => {
                                selectDiagram(id);
                                close();
                            }}
                            handleRename={() => openUpdateModal(id)}
                            key={id}
                            {...{name, lastUpdate}}
                        />
                    ),
                )
            }

            <DeleteModal
                isOpen={isDeleteModalOpened}
                handleClose={closeDeleteModal}
                deletedId={deletedId}
            />
            <RenameModal
                isOpen={isUpdateModalOpened}
                handleClose={closeUpdateModal}
                updatedId={updatedId}
            />
            <CreateModal
                isOpen={isCreateModalOpened}
                handleClose={closeCreateModal}
            />
        </div>
    );
};

export default withDiagramsPreviews(DiagramsPanel);
