import React from 'react';
import styles from './styles.less';

import {Button} from '@/components';

const EditorControls = ({
    downloadhandler,
    saveHandler,
    deleteHandler,
}) => (
    <div className={styles.editorControls}>
        <Button
            onClick={downloadhandler}
            styling="normal"
            className={styles.button}
        >
            {'Скачать'}
        </Button>
        <Button
            onClick={saveHandler}
            styling="normal"
            className={styles.button}
        >
            {'Сохранить'}
        </Button>
        <Button
            onClick={deleteHandler}
            styling="danger"
            className={styles.button}
        >
            {'Удалить'}
        </Button>
    </div>
);

export default EditorControls;
