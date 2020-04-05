import React, {useState} from 'react';

import {Modal, LabeledInput, Button} from '@/components';

import styles from './styles.less';
import {withLoggingIn} from './containers/withLoggingIn';

const AuthModal = ({
    loginInProgress,
    loginSuccess,
    loginError,
    isOpen,

    login,
}) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault(login);

        login({name, password});
    };

    return (
        <Modal
            isOpen={isOpen}
            closeable={false}
        >
            <form
                onSubmit={handleSubmit}
            >
                <LabeledInput
                    labelText={'Ваше имя'}
                    name={'name'}
                    type={'text'}
                    onChange={e => setName(e.target.value)}
                    value={name}
                    className={styles.input}
                />
                <LabeledInput
                    labelText={'Ваш пароль'}
                    name={'password'}
                    type={'password'}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    className={styles.input}
                />

                <Button
                    type={'submit'}
                    className={styles.button}
                >
                    {'Подтвердить'}
                </Button>
            </form>
        </Modal>
    );
};

export default withLoggingIn(AuthModal);
