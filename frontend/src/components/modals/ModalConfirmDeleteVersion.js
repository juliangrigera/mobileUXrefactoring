import React, {useState, useEffect} from 'react';
import { Modal, Button, Alert, Badge } from 'bootstrap-4-react';
import { closeModal } from '../utils/FunctionsUtils';


const ModalConfirmDeleteVersion = (props) => {

    const {version} = props;
    //PARA CONTROLAR EL MODAL Y SU CIERRE.
    const [show, setShow] =  useState({
        isOpen: true
    });

    const setUpdate = props.setUpdate;
    
    useEffect(() => {
        if(show.isOpen === false ){
            closeModal("delete-" + props.version.tag);
            setUpdate(true);// avisa al padre q actualizo
            setShow({
                isOpen : true
            })
        }
    }, [show])
    //----------------------------------------------\\
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
            setShow({
                isOpen: false
               })
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