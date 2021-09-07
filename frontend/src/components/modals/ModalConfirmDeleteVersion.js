import React from 'react';
import { Modal, Button, Alert, Badge } from 'bootstrap-4-react';


const ModalConfirmDeleteVersion = (props) => {

    const {version} = props;

    const deleteVersion = async () => {
        let path = localStorage.getItem('usertoken') + "/" + version.tag;
        const response = await fetch('/versions/' + path, {
            method: 'DELETE',
                body: JSON.stringify({
                    id: version._id
                }),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                }
        });
        const body = await response.json();
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
        <Modal id={"delete-" + props.version.tag} fade  >
            <Modal.Dialog centered lg >
                <Modal.Content>
                    <Modal.Body>
                        <Alert danger> <p>Usted esta por eliminar la versión {version.name} </p>
                            <p>Presione <Badge danger>ELIMINAR</Badge> para confirmar. </p>
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button secondary data-dismiss="modal">CANCELAR</Button>
                        <Button danger onClick={() => deleteVersion()}>ELIMINAR</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal.Dialog>
        </Modal>
    )
}

export default ModalConfirmDeleteVersion;