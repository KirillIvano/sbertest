import React from 'react';

import ReactModal from 'react-modal';
import classnames from 'classnames';

import styles from './styles.less';
import {CloseIcon} from '@/components';

const Modal = ({
    className,
    width,
    closeable=true,

    children,
    close,
    isOpen,

    ...extraProps
}) => (
    <ReactModal
        {...extraProps}

        bodyOpenClassName={styles.bodyOpen}
        overlayClassName={styles.modalOverlay}
        className={classnames(styles.modal, className)}
        style={{content: {width: `${width}px`}}}

        isOpen={isOpen}
        shouldCloseOnEsc={closeable}
        shouldCloseOnOverlayClick={false}

        onRequestClose={close}
    >
        {closeable ? <div className={styles.modalControls}>
            <CloseIcon close={close} />
        </div>: null}
        {children}
    </ReactModal>
);

ReactModal.setAppElement(document.body);

export default Modal;
