import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from 'bootstrap-4-react';
import { BsTrash, BsPencil } from "react-icons/bs";
import Loader from "react-loader-spinner";
import ModalUpdateRefactoring from "../modals/ModalUpdateRefactoring";
import ModalConfirmDelete from "../modals/ModalConfirmDelete";


function UserRefactoring(props) {
    const [refactorings, setRefactorings] = useState([{
        refName: "",
        elements: [String],
        params: Object
    }]);

    const [refactoring, setRefactoring] = useState({
        refName: "",
        elements: [String],
        params: Object
    });
    //const history = useHistory();
    useEffect(() => {
        getData().then(data => setRefactorings(data)).catch(e => console.log(e))
    }, [])
    const getData = async () => {
        //console.log(localStorage.getItem('token'));
        const response = await fetch('/refactorings/' + localStorage.getItem('usertoken'), {
            headers: { "authorization": localStorage.getItem('token') }
        });
        const body = await response.json();
        console.log(body);
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    const boxStyle = {
        display: 'inline-block',
        margin: '.25rem',
        backgroundColor: '#f5f5f5'
    }


    const showRefactoring = (refactorings) => {
        console.log(refactorings);
        const listRefactorings = refactorings.map((refactoring) =>
            <Container style={boxStyle} border mt="4">
                <Row bg="dark" text="white" p='2'>
                    <Col sm="10" className="text-center"><span className="font-weight-bold ">{refactoring.refName}</span></Col>
                    <Col sm="1" className="text-right"> <Button primary data-toggle="modal" data-target="#updateForm" onClick={() => setRefactoring(refactoring)}><BsPencil /></Button></Col>
                    <Col sm="1" className="text-center"><Button primary data-toggle="modal" data-target="#deleteConfirm" onClick={() => setRefactoring(refactoring)}><BsTrash /></Button></Col>
                </Row>
                <Row p='2'>
                    <Col sm="3"><span className="font-weight-bold ">¿Que hace?</span></Col>
                    <Col>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus tellus ac purus tincidunt, quis bibendum dui laoreet. Nunc sed.</Col>
                </Row>
                <Row p='2' bg="light">
                    <Col sm="3"><span className="font-weight-bold ">¿Dónde se aplica?</span></Col>
                    <Col>{refactoring.elements[0]}</Col>
                </Row>
                <Row p='2'>
                    <Col sm="3"><span className="font-weight-bold ">Parametros</span></Col>
                    <Col>{JSON.stringify(refactoring.params)}</Col>
                </Row>
            </Container>
        )
        return listRefactorings;
    }

    return (<div>{
        refactorings[0].refName !== ""
            ? showRefactoring(refactorings)
            : <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
            />
    }
    <ModalUpdateRefactoring refactoring={refactoring} />
    <ModalConfirmDelete refactoring={refactoring} />
    </div>)
}

export default UserRefactoring