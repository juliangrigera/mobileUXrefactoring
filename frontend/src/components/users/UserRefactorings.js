import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from 'bootstrap-4-react';
import { BsTrash, BsPencil } from "react-icons/bs";
import Loader from "react-loader-spinner";


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

    const [descriptions, setDescriptions] = useState({
        name:'',
        descriptions:''
    });

    useEffect(() => {
        getData().then(data => setRefactorings(data.refactorings)).catch(e => console.log(e));
        getData().then(data => setDescriptions(data.descriptions)).catch(e => console.log(e))
    },[])
    const getData = async () => {
        //console.log(localStorage.getItem('token'));
        const response = await fetch('/refactorings/' + localStorage.getItem('usertoken') + "/" + props.tag, {
            headers: { "authorization": localStorage.getItem('token') }
        });
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message)
        }else{
        }
        return body;
    };

    const boxStyle = {
        display: 'inline-block',
        margin: '.25rem',
        backgroundColor: '#f5f5f5'
    }

    const passRefactoring = (refactoring) => {
        setRefactoring(refactoring);
        const fun = props.test;
        fun(refactoring);
    }

    //Muestra la descripcion del refactoring pasado por parametro
    const showDescription = (refactoring) => {
        if( descriptions !== undefined && descriptions.length > 0){
            let res='';
            descriptions.forEach((desc) => {
                if(refactoring.refName === desc['name']){
                    res = desc['description']
                }
            })
            return res
        }else{
            return ' '
        }
    }

    const showRefactoring = (refactorings) => {
        const listRefactorings = refactorings.map((refactoring) =>
            <Container style={boxStyle} border mt="4">
                <Row bg="dark" text="white" p='2'>
                    <Col sm="10" className="text-center"><span className="font-weight-bold ">{refactoring.refName}</span></Col>
                    <Col sm="1" className="text-right"> <Button primary data-toggle="modal" data-target="#updateForm" onClick={()=>passRefactoring(refactoring)}><BsPencil /></Button></Col>
                    <Col sm="1" className="text-center"><Button primary data-toggle="modal" data-target="#deleteConfirm" onClick={()=> passRefactoring(refactoring)}><BsTrash /></Button></Col>
                </Row>
                <Row p='2'>
                    <Col sm="3"><span className="font-weight-bold ">¿Que hace?</span></Col>
                    <Col>{showDescription(refactoring)}</Col>
                </Row>
                <Row p='2' bg="light">
                    <Col sm="3"><span className="font-weight-bold ">¿Dónde se aplica?</span></Col>
                    <Col>{refactoring.elements.map((element) => element + "; ")}</Col>
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
        (refactorings !== undefined && refactorings.length > 0)
            ? showRefactoring(refactorings)
            : <Container>
                <Row p='2' bg="light">
                    <Col col="12 md-4"></Col>
                    <Col col="12 md-4"><Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    /></Col>
                    <Col col="12 md-4"></Col>
                </Row>
            </Container>
    }
    </div>)
}

export default UserRefactoring