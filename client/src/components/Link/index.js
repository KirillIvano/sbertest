import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

const Link = ({
    children,
    theme='light',
    className,
    ...props
}) =>
    (
        <a {...props} className={
            classnames(
                styles.link,
                className,
                {
                    [styles.light]: theme === 'light',
                    [styles.dark]: theme === 'dark',
                },
            )
        }>
            {children}
        </a>
    );

export default Link;
