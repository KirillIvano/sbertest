import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

const CloseIcon = ({
    close,
    theme='light',
}) => (
    <div
        onClick={close}
        className={classnames(
            styles.closeIcon,
            {
                [styles.dark]: theme === 'dark',
                [styles.light]: theme === 'light',
            },
        )}
    />
);

export default React.memo(CloseIcon);
