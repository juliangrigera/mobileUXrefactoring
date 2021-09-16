import React, {useState, useEffect} from 'react';
import { Modal } from 'bootstrap-4-react';
import AddVersionForm from '../forms/AddVersion';
import { closeModal } from '../utils/FunctionsUtils';


const ModalAddVersion = (props) => {

    const [show, setShow] =  useState({
        isOpen: true
    });

    const setUpdate = props.setUpdate;
    
    useEffect(() => {
        if(show.isOpen === false ){
            closeModal('addVersionForm');
            setUpdate(true);// avisa al padre q actualizo
            setShow({
                isOpen : true
            })
        }
    }, [show])

    return (
        <Modal id="addVersionForm" fade>
            <Modal.Dialog centered>
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Crear nueva version</Modal.Title>
                        <Modal.Close>
                            <span aria-hidden="true">&times;</span>
                        </Modal.Close>
                    </Modal.Header>
                    <Modal.Body>
                        <AddVersionForm show={show.isOpen} setShow={setShow}/>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Dialog>
        </Modal>
    )
}

export default ModalAddVersion;