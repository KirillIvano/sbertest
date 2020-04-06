import React from 'react';
import styles from './styles.less';

const Preview = () => (
    <div className={styles.error}>
        <p className={styles.content}>
            {'Произошла ошибка, загрузите другую диаграмму или перезагрузите страницу!'}
        </p>
    </div>
);

export default Preview;
