import React from 'react';
import { Modal } from 'bootstrap-4-react';
import UpdateVersionForm from '../forms/UpdateVersion';

const ModalUpdateVersion = (props) => {

    const { version } =  props;

    return (
        <Modal id={"modify-" + version.tag} fade>
            <Modal.Dialog centered>
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Actualizar Datos de la versión {version.name}</Modal.Title>
                        <Modal.Close>
                            <span aria-hidden="true">&times;</span>
                        </Modal.Close>
                    </Modal.Header>
                    <Modal.Body>
                        <UpdateVersionForm version={version} />
                    </Modal.Body>
                </Modal.Content>
            </Modal.Dialog>
        </Modal>
    )
}

export default ModalUpdateVersion;