import React from 'react';

import {Button} from '@/components';

import styles from './styles.less';

const Header = () => (
    <header className={styles.header}>
        <div className={styles.headerContent}>
            <Button>
                Диаграммы
            </Button>
            <Button>
                Войти
            </Button>
        </div>
    </header>
);

export default Header;
