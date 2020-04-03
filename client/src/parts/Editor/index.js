import React, {useEffect, useRef} from 'react';
import Modeler from 'bpmn-js/lib/Modeler';
import classnames from 'classnames';

import styles from './styles.less';
import initialDiagram from './initialDiagram';

const Editor = ({
    diagram=initialDiagram,
}) => {
    const ref = useRef();

    useEffect(() => {
        setTimeout(() => {
            const modeler = new Modeler({
                // here I need to pass the ref
                container: ref.current,
            });

            modeler.importXML(diagram);
        }, 0);
    }, []);

    return (<div ref={ref} className={classnames(styles.editor)}></div>);
};

export default Editor;
