import React, {useState} from 'react';
import {render} from 'react-dom';
import {Provider as StoreProvider} from 'react-redux';

import {Header, Editor, DiagramsSelector} from '@/parts';
import {store} from '@/redux';

import styles from './css/app.less';

const root = document.getElementById('root');

const usePanelState = defaultVal => {
    const [val, setVal] = useState(defaultVal);
    return [
        val,
        () => setVal(true),
        () => setVal(false),
    ];
};

const App = () => {
    const [isDiagramPanelOpened, openDiagramsPanel, closeDiagramsPanel] = usePanelState(true);

    return (
        <div className={styles.root}>
            <Header openDiagramsPanel={openDiagramsPanel} />
            <Editor />
            <DiagramsSelector close={closeDiagramsPanel} isOpen={isDiagramPanelOpened} />
        </div>
    );
};

render(
    <StoreProvider store={store()}>
        <App />
    </StoreProvider>,
    root,
);
