import React, {useRef} from 'react';
import classnames from 'classnames';

import {getLabelId} from '@/helpers/labelId';

import styles from './styles.less';

const LabeledInput = ({
    name,
    className,

    ...props
}) => {
    const {current: formId} = useRef(getLabelId());

    return (
        <input
            {...props}
            className={classnames(styles.input, {[className]: !!className})}
            id={formId}
            name={name}
        />
    );
};

const enchancedInput = React.memo(LabeledInput);

export default enchancedInput;
