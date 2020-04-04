import React, {useEffect, useMemo} from 'react';
import classnames from 'classnames';

import {Button, CloseIcon} from '@/components';
import {formatDate} from '@/helpers/formatDate';

import {withDiagramsPreviews} from './containers/withDiagramsPreviews';
import styles from './styles.less';

const DiagramCard = ({
    name,
    lastUpdate,
}) => {
    const date = useMemo(() => formatDate(lastUpdate), [lastUpdate]);

    return (
        <div className={styles.diagramCard}>
            <h1 className={styles.cardName}>
                {name}
            </h1>
            <p className={styles.cardDate}>
                {date}
            </p>
            <div className={styles.cardControls}>
                <Button className={styles.button}>
                    {'Переименовать'}
                </Button>
                <Button className={styles.button}>
                    {'Редактировать'}
                </Button>
            </div>
        </div>
    );
};

const DiagramsSelector = ({
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
            </div>
            {
                diagrams.map(({id, name, lastUpdate}) => <DiagramCard key={id} name={name} lastUpdate={lastUpdate} />)
            }
        </div>
    );
};

export default withDiagramsPreviews(DiagramsSelector);
