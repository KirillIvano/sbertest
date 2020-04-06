import React, {useRef} from 'react';
import classnames from 'classnames';

import {getLabelId} from '@/helpers/labelId';

import styles from './styles.less';

const Input = ({
    name,
    className,
    id,
    ...props
}) => {
    return (
        <input
            {...props}
            className={classnames(styles.input, {[className]: !!className})}
            id={id}
            name={name}
        />
    );
};

const enchancedInput = React.memo(Input);

export default enchancedInput;
