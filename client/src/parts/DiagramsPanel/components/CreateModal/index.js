import React, {useState, useEffect} from 'react';

import {Modal, LabeledInput, Button} from '@/components';

import {withDiagramCreating} from './containers/withDiagramCreating';
import styles from './styles.less';

const CreateModal = ({
    isOpen,
    handleClose,

    diagramCreatingInProgress,
    diagramCreatingSuccess,

    createDiagram,
}) => {
    const [name, setName] = useState('');

    useEffect(() => {
        setName('');

        handleClose();
    }, [diagramCreatingSuccess]);

    const handleSubmit = e => {
        e.preventDefault();

        createDiagram(name);
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
                    labelText={'Имя диаграммы'}
                />

                <div className={styles.modalControls}>
                    <Button
                        disabled={diagramCreatingInProgress}
                        type={'submit'}
                        className={styles.controlButton}
                    >
                        {'Добавить'}
                    </Button>
                    <Button
                        onClick={handleClose}
                        disabled={diagramCreatingInProgress}
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

export default withDiagramCreating(CreateModal);
