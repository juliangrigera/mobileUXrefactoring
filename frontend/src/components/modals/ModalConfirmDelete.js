import React from 'react';
import { Modal, Button, Alert } from 'bootstrap-4-react';

const ModalConfirmDelete = (props) => {
    
    const deleteRefactoring = async () => {
        const response = await fetch('/refactorings/delete/' + localStorage.getItem('usertoken'), {
            method: 'POST',
                body: JSON.stringify({
                    id: props.refactoring._id
                }),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                }
        });
        const body = await response.json();
        console.log(body);
        if (!body.success && body.success!=='undefined') {
            if(body.status===403){
                localStorage.removeItem('token');
                localStorage.removeItem('usertoken');
            }
            throw Error(body.message)
        }
        return body;
    };
    
    return (
        <Modal id="deleteConfirm" fade>
            <Modal.Dialog centered sm >
                <Modal.Content>
                    <Modal.Body>
                    <Alert danger>Confirma que desea eliminar este Refactoring?</Alert>
                    </Modal.Body>
                    <Modal.Footer>
                <Button secondary data-dismiss="modal">Cancelar</Button>
                <Button primary onClick={() => deleteRefactoring()}>Confirmar</Button>
              </Modal.Footer>
                </Modal.Content>
            </Modal.Dialog>
        </Modal>
    )
}

export default ModalConfirmDelete;