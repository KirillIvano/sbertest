import React from 'react';
import styles from './styles.less';

const Preloader = () => (
    <div className={styles.preloader}>
        <div className={styles.firstLayer}></div>
        <div className={styles.secondLayer}></div>
        <div className={styles.thirdLayer}></div>
    </div>
);

export default Preloader;
