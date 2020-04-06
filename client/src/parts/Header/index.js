import React from 'react';

import {Button} from '@/components';

import styles from './styles.less';
import {withUnlogin} from './containers/withUnlogin';

const Header = ({
    openDiagramsPanel,
    unlogin,
}) => (
    <header className={styles.header}>
        <div className={styles.headerContent}>
            <Button onClick={openDiagramsPanel}>
                Диаграммы
            </Button>
            <Button onClick={unlogin}>
                Выйти
            </Button>
        </div>
    </header>
);

export default withUnlogin(Header);
