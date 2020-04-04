import React from 'react';
import styles from './styles.less';

const Preview = () => (
    <div className={styles.preview}>
        <p className={styles.content}>
            {'Выберите диаграмму из списка или создайте новую'}
        </p>
    </div>
);

export default Preview;
