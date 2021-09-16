import React, {useState, useEffect} from 'react';
import { Modal } from 'bootstrap-4-react';
import UpdateForm from '../forms/UpdateRefactoring';
import { closeModal } from '../utils/FunctionsUtils';

const ModalUpdateRefactoring = (props) => {

    const [show, setShow] =  useState({
        isOpen: true
    });

    const setUpdate = props.setUpdate;
    
    useEffect(() => {
        if(show.isOpen === false ){
            closeModal('updateForm');
            setUpdate(true);// avisa al padre q actualizo
            setShow({
                isOpen : true
            })
        }
    }, [show])
    return (
        <Modal  id="updateForm"  >
            <Modal.Dialog centered>
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Actualizar Datos</Modal.Title>
                        <Modal.Close>
                            <span aria-hidden="true">&times;</span>
                        </Modal.Close>
                    </Modal.Header>
                    <Modal.Body>
                        <UpdateForm refactoring={props.refactoring} show={show.isOpen} setShow={setShow}/>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Dialog>
        </Modal>
    )
}

export default ModalUpdateRefactoring;

