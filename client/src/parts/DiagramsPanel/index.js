import React, {useEffect, useMemo} from 'react';
import classnames from 'classnames';

import {Button, CloseIcon} from '@/components';
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
        <Button
            className={styles.button}
            onClick={handleSelect}
        >
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
    id,
    lastUpdate,
    handleSelect,
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
            <DiagramControls
                handleDelete={() => handleDelete(id)}
                handleSelect={() => handleSelect(id)}
            />
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
