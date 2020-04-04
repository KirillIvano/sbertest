import React from 'react';

import {Message} from './components';
import {withMessageBoxProps} from './containers/withMessageBoxProps';
import styles from './styles.less';

const MessageBox = ({messages}) => (
    <div className={styles.messageBox}>
        {
            messages.map(({id, ...message}) => <Message key={id} {...message} />)
        }
    </div>
);

export default withMessageBoxProps(MessageBox);
