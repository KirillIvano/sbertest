import React, {useRef} from 'react';

import {InputLabel, Input} from '..';
import {getLabelId} from '@/helpers/labelId';

const LabeledInput = ({
    labelText,
    name,
    className,

    ...props
}) => {
    const {current: formId} = useRef(getLabelId());

    return (
        <div className={className}>
            <InputLabel name={formId}>
                {labelText}
            </InputLabel>
            <Input {...props} id={formId} name={name} />
        </div>
    );
};

const enchancedInput = React.memo(LabeledInput);

export default enchancedInput;
