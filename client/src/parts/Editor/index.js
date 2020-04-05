import React, {useEffect, useRef, useMemo} from 'react';
import Modeler from 'bpmn-js/lib/Modeler';
import classnames from 'classnames';

import {getDiagramUrl} from '@/helpers/getDiagramUrl';

import {EditorControls, Preview, Preloader} from './components';
import {withEditorProps} from './containers/withEditorProps';
import styles from './styles.less';

const Editor = ({
    fileName,
    file,

    diagramFileGettingInProgress,
    diagramFileGettingError,
    diagramFileGettingSuccess,

    saveXml,
}) => {
    const modelerElementRef = useRef();
    const modelerRef = useRef();
    const fileUrl = useMemo(() => getDiagramUrl(fileName), [fileName]);

    useEffect(() => {
        if (diagramFileGettingSuccess) {
            setTimeout(() => {
                const modeler = new Modeler({
                    container: modelerElementRef.current,
                });

                modeler.importXML(file);

                modelerRef.current = modeler;
            }, 0);
        }
    }, [diagramFileGettingSuccess]);

    if (diagramFileGettingInProgress) {
        return <Preloader />;
    }

    if (diagramFileGettingError) {
        return 'Произошла ошибка';
    }

    if (!fileName) {
        return <Preview />;
    }

    return (
        <div ref={modelerElementRef} className={classnames(styles.editor)}>
            <EditorControls
                downloadAddress={fileUrl}
                saveHandler={saveXml}
            />
        </div>
    );
};

export default withEditorProps(Editor);
