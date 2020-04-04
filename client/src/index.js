import React from 'react';
import {render} from 'react-dom';
import {Provider as StoreProvider} from 'react-redux';

import {Header, Editor, DiagramsSelector, MessageBox} from '@/parts';
import {store} from '@/redux';
import {useModalState} from '@/hooks/useModalState';

import styles from './css/app.less';

const root = document.getElementById('root');

const App = () => {
    const [isDiagramPanelOpened, openDiagramsPanel, closeDiagramsPanel] = useModalState(true);

    return (
        <div className={styles.root}>
            <Header openDiagramsPanel={openDiagramsPanel} />
            <Editor />
            <DiagramsSelector close={closeDiagramsPanel} isOpen={isDiagramPanelOpened} />
            <MessageBox />
        </div>
    );
};

render(
    <StoreProvider store={store()}>
        <App />
    </StoreProvider>,
    root,
);
