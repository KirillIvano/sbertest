import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

const Button = ({
    styling='normal',
    className,

    children,
    ...additionalProps
}) => (
    <button
        {...additionalProps}
        type={'button'}
        className={
            classnames(
                styles.button,
                className,
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
