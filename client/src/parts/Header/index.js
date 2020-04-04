import React from 'react';

import {Button} from '@/components';

import styles from './styles.less';

const Header = ({
    openDiagramsPanel,
}) => (
    <header className={styles.header}>
        <div className={styles.headerContent}>
            <Button onClick={openDiagramsPanel}>
                Диаграммы
            </Button>
            <Button>
                Выйти
            </Button>
        </div>
    </header>
);

export default Header;
