import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

const Button = ({
    styling='normal',
    children,
}) => (
    <button
        type={'button'}
        className={
            classnames(
                styles.button,
                {
                    [styles.danger]: styling === 'danger',
                    [styles.normal]: styling === 'normal',
                },
            )
        }
    >
        {children}
    </button>
);

export default Button;
