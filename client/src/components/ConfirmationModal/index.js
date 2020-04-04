import React from 'react';

import {Modal, Button} from '@/components';

import styles from './styles.less';

const ModalControls = ({
    handleConfirm,
    handleReject,
    disabled,
}) => (
    <div className={styles.controls}>
        <Button
            disabled={disabled}
            styling='danger'
            onClick={handleConfirm}
            className={styles.button}
        >
            Подтвердить
        </Button>
        <Button
            disabled={disabled}
            onClick={handleReject}
            className={styles.button}
        >
            Отмена
        </Button>
    </div>
);

const ConfirmationModal = ({
    children,

    handleConfirm,
    handleReject,
    isOpen,
    areControlsDisabled,

    ...modalProps
}) => (
    <Modal
        {...modalProps}

        isOpen={isOpen}
        className={styles.modal}
        width={400}
        closeable={false}
    >
        <div className={styles.modalContent}>
            <p className={styles.text}>
                {children}
            </p>

            <ModalControls
                disabled={areControlsDisabled}
                handleConfirm={handleConfirm}
                handleReject={handleReject}
            />
        </div>
    </Modal>
);

export default ConfirmationModal;
