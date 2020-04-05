import React, {useMemo} from 'react';

import {formatDate} from '@/helpers/formatDate';
import {Button} from '@/components';

import styles from './styles.less';

const DiagramControls = ({
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
                handleDelete={handleDelete}
                handleSelect={handleSelect}
            />
        </div>
    );
};

export default DiagramCard;
