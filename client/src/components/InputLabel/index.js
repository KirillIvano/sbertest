import React from 'react';

import styles from './styles.less';

const InputLabel = ({
    name,
    children,
}) => (
    <label className={styles.label} htmlFor={name}>
        {children}
    </label>
);

export default InputLabel;
