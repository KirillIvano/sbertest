import React, {useEffect, useMemo} from 'react';
import classnames from 'classnames';

import {Button, CloseIcon} from '@/components';
import {useModalState} from '@/hooks/useModalState';

import {DeleteModal, CreateModal, DiagramCard} from './components';
import {withDiagramsPreviews} from './containers/withDiagramsPreviews';
import {useDeleteModalState} from './hooks/useDeleteModalState';
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
            (a, b) => a < b ? 1 : -1,
        ),
        [diagrams],
    );

    const {
        isDeleteModalOpened,
        openDeleteModal,
        closeDeleteModal,
        deletedId,
    } = useDeleteModalState(false);
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
                            handleDelete={openDeleteModal}
                            handleSelect={selectDiagram}
                            key={id}
                            {...{id, name, lastUpdate}}
                        />
                    ),
                )
            }

            <DeleteModal
                isOpen={isDeleteModalOpened}
                handleClose={closeDeleteModal}
                deletedId={deletedId}
            />
            <CreateModal
                isOpen={isCreateModalOpened}
                handleClose={closeCreateModal}
            />
        </div>
    );
};

export default withDiagramsPreviews(DiagramsPanel);
