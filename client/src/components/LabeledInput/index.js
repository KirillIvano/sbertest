import React, {useMemo} from 'react';

import {InputLabel, Input} from '..';
import {getLabelId} from '@/helpers/labelId';

const LabeledInput = ({
    labelText,
    name,
    className,

    ...props
}) => {
    const formId = useMemo(() => getLabelId(), []);

    return (
        <div className={className}>
            <InputLabel id={formId} name={name}>
                {labelText}
            </InputLabel>
            <Input {...props} id={formId} name={name} />
        </div>
    );
};

const enchancedInput = React.memo(LabeledInput);

export default enchancedInput;
