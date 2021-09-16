import React, {useState, useEffect} from 'react';
import { Modal } from 'bootstrap-4-react';
import DuplicateVersionForm from '../forms/DuplicateVersion';
import { closeModal } from '../utils/FunctionsUtils';


const ModalDuplicateVersion = (props) => {
    const {version} = props;

    const [show, setShow] =  useState({
        isOpen: true
    });

    const setUpdate = props.setUpdate;
    
    useEffect(() => {
        if(show.isOpen === false ){
            closeModal("duplicate-" + version.tag);
            setUpdate(true);// avisa al padre q actualizo
            setShow({
                isOpen : true
            })
        }
    }, [show])

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
                        <DuplicateVersionForm version={version} show={show.isOpen} setShow={setShow}/>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Dialog>
        </Modal>
    )
}

export default ModalDuplicateVersion;