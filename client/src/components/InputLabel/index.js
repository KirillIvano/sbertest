import React from 'react';

import styles from './styles.less';

const InputLabel = ({
    id,
    children,
}) => (
    <label className={styles.label} htmlFor={id}>
        {children}
    </label>
);

export default InputLabel;
