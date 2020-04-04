import React, {useEffect, useMemo} from 'react';
import classnames from 'classnames';

import {Button, CloseIcon, ConfirmationModal} from '@/components';
import {formatDate} from '@/helpers/formatDate';
import {useModalState} from '@/hooks/useModalState';

import {DeleteModal, CreateModal} from './components';
import {withDiagramsPreviews} from './containers/withDiagramsPreviews';
import {useDeleteModalState} from './hooks/useDeleteModalState';
import styles from './styles.less';


const DiagramControls = ({
    disabled=false,
    // handleRename,
    handleSelect,
    handleDelete,
}) => (
    <div className={styles.cardControls}>
        <Button className={styles.button}>
            {'Переименовать'}
        </Button>
        <Button className={styles.button}>
            {'Редактировать'}
        </Button>
        <Button
            styling="danger"
            className={styles.button}
            onClick={handleDelete}
        >
            {'Удалить'}
        </Button>
    </div>
);

const DiagramCard = ({
    name,
    lastUpdate,
    handleDelete,
}) => {
    const date = useMemo(() => formatDate(lastUpdate), [lastUpdate]);

    return (
        <div className={styles.diagramCard}>
            <div className={styles.cardInfo}>
                <h1 className={styles.cardName}>
                    {name}
                </h1>
                <p className={styles.cardDate}>
                    {date}
                </p>
            </div>
            <DiagramControls handleDelete={handleDelete} />
        </div>
    );
};

const DiagramsPanel = ({
    isOpen,
    close,

    diagramsGettingInProgress,
    diagramsGettingError,
    diagrams,

    getPreviews,
}) => {
    useEffect(() => {
        if (isOpen) {
            getPreviews();
        }
    }, [isOpen]);

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
                <CloseIcon close={close} styling={'dark'} />
                <Button onClick={openCreateModal}>
                    {'Создать диаграмму'}
                </Button>
            </div>
            {
                diagrams.map(
                    ({
                        id,
                        name,
                        lastUpdate,
                    }) => (
                        <DiagramCard
                            handleDelete={() => openDeleteModal(id)}
                            key={id}
                            name={name}
                            lastUpdate={lastUpdate}
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
