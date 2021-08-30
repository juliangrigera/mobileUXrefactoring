import React from 'react';
import { Modal, Button, Alert, Badge } from 'bootstrap-4-react';


const ModalConfirmDelete = (props) => {

    const deleteRefactoring = async (version='') => {
        let path = localStorage.getItem('usertoken')+version;
        console.log(path);
        const response = await fetch('/refactorings/delete/' + path, {
            method: 'PUT',
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
        }else{
        }
        return body;
    };
    
    return (
        <Modal id="deleteConfirm" fade  >
            <Modal.Dialog centered lg >
                <Modal.Content>
                    <Modal.Body>
                        <Alert danger> <p>Usted esta por eliminar el refactoring elegido. </p>
                            <p>Presione <Badge danger>COMPLETA</Badge> si desea <strong>eliminarlo</strong> de todas las versiones. </p>
                            <p>Presione <Badge primary>VERSION</Badge> si desea <strong>eliminarlo</strong> solo de esta version. </p>
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button secondary data-dismiss="modal">CANCELAR</Button>
                        <Button primary onClick={() => deleteRefactoring('/'+props.tag)}>VERSION</Button>
                        <Button danger onClick={() => deleteRefactoring()}>COMPLETA</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal.Dialog>
        </Modal>
    )
}

export default ModalConfirmDelete;