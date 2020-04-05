import React from 'react';
import styles from './styles.less';

import {Button} from '@/components';

const EditorControls = ({
    disabled=false,
    handleDownload,
    handleSave,
}) => (
    <div className={styles.editorControls}>
        <Button
            disabled={disabled}
            onClick={handleDownload}
            styling="normal"
            className={styles.button}
        >
            {'Скачать'}
        </Button>
        <Button
            disabled={disabled}
            onClick={handleSave}
            styling="normal"
            className={styles.button}
        >
            {'Сохранить'}
        </Button>
    </div>
);

export default EditorControls;
