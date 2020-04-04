import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

const CloseIcon = ({
    close,
    styling='light',
}) => (
    <div
        onClick={close}
        className={classnames(
            styles.closeIcon,
            {
                [styles.dark]: styling === 'dark',
                [styles.light]: styling === 'light',
            },
        )}
    />
);

export default React.memo(CloseIcon);
