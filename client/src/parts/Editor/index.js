import React, {useEffect, useRef, useMemo} from 'react';
import Modeler from 'bpmn-js/lib/Modeler';
import classnames from 'classnames';

import {getDiagramUrl} from '@/helpers/getDiagramUrl';

import {EditorControls, Preview, Preloader} from './components';
import {withEditorProps} from './containers/withEditorProps';
import styles from './styles.less';

const Editor = ({
    fileName,

    diagramFileLoadingInProgress,
    diagramFileLoadingError,
    diagramFileLoadingSuccess,

    saveXml,
}) => {
    const modelerElementRef = useRef();
    const modelerRef = useRef();
    const fileUrl = useMemo(() => getDiagramUrl(fileName), [fileName]);

    useEffect(() => {
        if (diagramFileLoadingSuccess) {
            setTimeout(() => {
                const modeler = new Modeler({
                    container: modelerElementRef.current,
                });

                modeler.importXML(fileName);

                modelerRef.current = modeler;
            }, 0);
        }
    }, [diagramFileLoadingSuccess]);

    if (diagramFileLoadingInProgress) {
        return <Preloader />;
    }

    if (diagramFileLoadingError) {
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
