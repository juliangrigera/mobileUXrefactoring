import React from 'react';
import { Modal } from 'bootstrap-4-react';
import UpdateForm from '../forms/UpdateRefactoring';

const ModalUpdateRefactoring = (props) => {
    return (
        <Modal id="updateForm" fade>
            <Modal.Dialog centered>
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Actualizar Datos</Modal.Title>
                        <Modal.Close>
                            <span aria-hidden="true">&times;</span>
                        </Modal.Close>
                    </Modal.Header>
                    <Modal.Body>
                        <UpdateForm refactoring={props.refactoring}/>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Dialog>
        </Modal>
    )
}

export default ModalUpdateRefactoring;

