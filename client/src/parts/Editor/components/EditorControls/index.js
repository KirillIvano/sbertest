import React from 'react';
import styles from './styles.less';

import {Button} from '@/components';
import {withSavingProgressInfo} from './containers/withSavingProcessInfo';

const EditorControls = ({
    handleDownload,
    handleSave,

    isDiagramSavingInProgress,
}) => (
    <div className={styles.editorControls}>
        <Button
            onClick={handleDownload}
            styling="normal"
            className={styles.button}
        >
            {'Скачать'}
        </Button>
        <Button
            disabled={isDiagramSavingInProgress}
            onClick={handleSave}
            styling="normal"
            className={styles.button}
        >
            {'Сохранить'}
        </Button>
    </div>
);

export default withSavingProgressInfo(EditorControls);
