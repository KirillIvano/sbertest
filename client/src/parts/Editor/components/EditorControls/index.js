import React from 'react';
import styles from './styles.less';

import {Button, Link} from '@/components';

const EditorControls = ({
    disabled=false,
    downloadAddress,
    saveHandler,
}) => (
    <div className={styles.editorControls}>
        <Link
            disabled={disabled}
            href={downloadAddress}
            styling="normal"
            className={styles.button}
        >
            {'Скачать'}
        </Link>
        <Button
            disabled={disabled}
            onClick={saveHandler}
            styling="normal"
            className={styles.button}
        >
            {'Сохранить'}
        </Button>
    </div>
);

export default EditorControls;
