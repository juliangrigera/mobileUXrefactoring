import React, {useState, useEffect} from 'react';
import { Modal } from 'bootstrap-4-react';
import UpdateVersionForm from '../forms/UpdateVersion';
import { closeModal } from '../utils/FunctionsUtils';

const ModalUpdateVersion = (props) => {

    const { version } =  props;
    const [show, setShow] =  useState({
        isOpen: true
    });

    const setUpdate = props.setUpdate;
    
    useEffect(() => {
        if(show.isOpen === false ){
            closeModal("modify-" + version.tag);
            setUpdate(true);// avisa al padre q actualizo
            setShow({
                isOpen : true
            })
        }
    }, [show])
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
                        <UpdateVersionForm version={version} show={show.isOpen} setShow={setShow}/>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Dialog>
        </Modal>
    )
}

export default ModalUpdateVersion;