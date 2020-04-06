import React, {useEffect} from 'react';
import {render} from 'react-dom';
import {Provider as StoreProvider} from 'react-redux';
import 'babel-polyfill';

import {Header, Editor, DiagramsPanel, MessageBox, AuthModal} from '@/parts';
import {store} from '@/redux';
import {useModalState} from '@/hooks/useModalState';
import {withAppStartAuth} from '@/containers/withAppStartAuth';

import styles from './css/app.less';

const root = document.getElementById('root');

const App = withAppStartAuth(
    ({tryAuth, isAuthenticated}) => {
        const [isDiagramPanelOpened, openDiagramsPanel, closeDiagramsPanel] = useModalState(true);

        useEffect(() => {
            tryAuth();
        }, []);

        return (
            <div className={styles.root}>
                <Header openDiagramsPanel={openDiagramsPanel} />
                {isAuthenticated ?
                    <>
                        <Editor />
                        <DiagramsPanel close={closeDiagramsPanel} isOpen={isDiagramPanelOpened} />
                    </> :
                    <AuthModal isOpen={true} />
                }
                <MessageBox />
            </div>
        );
    },
);

render(
    <StoreProvider store={store()}>
        <App />
    </StoreProvider>,
    root,
);
