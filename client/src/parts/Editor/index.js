import React, {useEffect, useRef} from 'react';
import Modeler from 'bpmn-js/lib/Modeler';
import classnames from 'classnames';

import {downloadDiagram} from '@/helpers/downloadXml';

import {EditorControls, Preview, Preloader, ErrorView} from './components';
import {withEditorProps} from './containers/withEditorProps';
import styles from './styles.less';

const Editor = ({
    diagramName,
    fileName,
    file,
    diagramId,

    diagramFileGettingInProgress,
    diagramFileGettingError,
    diagramFileGettingSuccess,

    saveXml,
    showXmlSavingError,
}) => {
    const modelerElementRef = useRef();
    const modelerRef = useRef();

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
        return <ErrorView />;
    }
    if (!fileName) {
        return <Preview />;
    }

    const handleSave = () => {
        modelerRef.current.saveXML(
            {format: true},
            (err, xml) => {
                if (err) {
                    showXmlSavingError();
                    return;
                }
                saveXml(diagramId, xml);
            },
        );
    };

    const handleDownload = () => {
        modelerRef.current.saveXML(
            {format: true},
            (err, xml) => {
                if (err) {
                    showXmlSavingError();
                    return;
                }
                downloadDiagram(diagramName, xml);
            },
        );
    };

    return (
        <div className={styles.editorContainer}>
            <div ref={modelerElementRef} className={classnames(styles.editor)}>
                <EditorControls
                    handleDownload={handleDownload}
                    handleSave={handleSave}
                />
            </div>
        </div>
    );
};

export default withEditorProps(Editor);
