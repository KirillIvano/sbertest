import React, {useState, useEffect} from 'react';

import {Modal, LabeledInput, Button} from '@/components';

import {withDiagramRenaming} from './containers/withDiagramRenaming';
import styles from './styles.less';

const RenameModal = ({
    isOpen,
    handleClose,

    diagramRenamingInProgress,
    diagramRenamingSuccess,

    renameDiagram,
}) => {
    const [name, setName] = useState('');

    useEffect(() => {
        setName('');

        handleClose();
    }, [diagramRenamingSuccess]);

    const handleSubmit = e => {
        e.preventDefault();

        renameDiagram(name);
    };

    return (
        <Modal
            isOpen={isOpen}
            close={handleClose}
            closeable={true}
        >
            <form onSubmit={handleSubmit}>
                <LabeledInput
                    onChange={e => setName(e.target.value)}
                    value={name}
                    name={'name'}
                    labelText={'Новое имя диаграммы'}
                    placeholder={'новое имя'}
                />

                <div className={styles.modalControls}>
                    <Button
                        disabled={diagramRenamingInProgress}
                        type={'submit'}
                        className={styles.controlButton}
                    >
                        {'Переименовать'}
                    </Button>
                    <Button
                        onClick={handleClose}
                        disabled={diagramRenamingInProgress}
                        className={styles.controlButton}
                        styling="danger"
                    >
                        {'Отмена'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default withDiagramRenaming(RenameModal);
