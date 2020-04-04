import React, {useEffect, useRef, useMemo} from 'react';
import Modeler from 'bpmn-js/lib/Modeler';
import classnames from 'classnames';

import {getDiagramUrl} from '@/helpers/getDiagramUrl';

import {EditorControls} from './components';
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
        return 'Загрузка...';
    }

    if (diagramFileLoadingError) {
        return 'Произошла ошибка';
    }

    // const handleSave = () => {
    //     modeler.saveXML({ format: true }, (err, xml) => {

    //     });
    // };

    return (
        <div ref={modelerElementRef} className={classnames(styles.editor)}>
            <EditorControls downloadAddress={getDiagramUrl(fileName)} />
        </div>
    );
};

export default withEditorProps(Editor);
