import React from 'react';
import { Modal } from 'bootstrap-4-react';
import DuplicateVersionForm from '../forms/DuplicateVersion'

const ModalDuplicateVersion = (props) => {
    const {version} = props;

    return (
        <Modal id={"duplicate-" + version.tag} fade>
            <Modal.Dialog centered>
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Crear nueva version duplicando la anterior</Modal.Title>
                        <Modal.Close>
                            <span aria-hidden="true">&times;</span>
                        </Modal.Close>
                    </Modal.Header>
                    <Modal.Body>
                        <DuplicateVersionForm version={version} />
                    </Modal.Body>
                </Modal.Content>
            </Modal.Dialog>
        </Modal>
    )
}

export default ModalDuplicateVersion;