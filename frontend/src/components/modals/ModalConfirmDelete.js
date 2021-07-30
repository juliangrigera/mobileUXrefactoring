import React from 'react';
import { Modal, Button, Alert } from 'bootstrap-4-react';

const ModalConfirmDelete = (props) => {
    return (
        <Modal id="deleteConfirm" fade>
            <Modal.Dialog centered sm >
                <Modal.Content>
                    <Modal.Body>
                    <Alert danger>Confirma que desea eliminar este Refactoring?</Alert>
                    </Modal.Body>
                    <Modal.Footer>
                <Button secondary data-dismiss="modal">Cancelar</Button>
                <Button primary onClick={() => delete()}>Confirmar</Button>
              </Modal.Footer>
                </Modal.Content>
            </Modal.Dialog>
        </Modal>
    )
}

export default ModalConfirmDelete;