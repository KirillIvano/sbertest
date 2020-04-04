import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

const Message = ({
    title,
    content,

    styling='normal',
}) => {
    return (
        <div
            className={classnames(
                styles.message,
                {[styles.error]: styling === 'error'},
            )}
        >
            <h1 className={styles.title}>
                {title}
            </h1>
            <p className={styles.content}>
                {content}
            </p>
        </div>
    );
};

export default Message;
