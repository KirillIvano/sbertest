import React from 'react';
import {render} from 'react-dom';
import styles from './css/app.less';

import {Header, Editor} from '@/parts';
import {Button} from '@/components';
const root = document.getElementById('root');

const App = () => (
    <div className={styles.root}>
        <Header />
        <Editor />
    </div>
);

render(
    <App />,
    root,
);

console.log('xxxx');
