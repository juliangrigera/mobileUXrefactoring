import React from 'react';
import { Modal } from 'bootstrap-4-react';
import AddVersionForm from '../forms/AddVersion';

const ModalAddVersion = (props) => {
    return (
        <Modal id="addVersionForm" fade>
            <Modal.Dialog centered>
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Crear nueva version</Modal.Title>
                        <Modal.Close>
                            <span aria-hidden="true">&times;</span>
                        </Modal.Close>
                    </Modal.Header>
                    <Modal.Body>
                        <AddVersionForm />
                    </Modal.Body>
                </Modal.Content>
            </Modal.Dialog>
        </Modal>
    )
}

export default ModalAddVersion;