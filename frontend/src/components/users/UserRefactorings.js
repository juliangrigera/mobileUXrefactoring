import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'bootstrap-4-react';

function UserRefactoring(props){
    const [refactorings, setRefactorings] = useState([{
        refName: "",
        elements: [String],
        params: Object
      }]);
    //const history = useHistory();
    useEffect(() => {
        getData().then(data => setRefactorings(data)).catch(e => console.log(e))
    }, [])
    const getData = async () => {
        //console.log(localStorage.getItem('token'));
        const response = await fetch('/refactorings/'+localStorage.getItem('usertoken'), {
            headers:{"authorization": localStorage.getItem('token')}
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
        const listRefactorings = refactorings.map((refactoring) =>
        <Container style={boxStyle} border>
        <Row bg="light" p='2'>
            <Col>{refactoring.refName}</Col>
         </Row>
         <Row p='2'>
         <Col>{refactoring.elements[0]}</Col>
         <Col>{JSON.stringify(refactoring.params)}</Col>
       </Row>
       </Container>
        )
        return listRefactorings;
    }

    return(<div>{
            refactorings[0].refName !== "" 
                ? showRefactoring(refactorings)
                :<p> Loading...</p>
        }</div>)
}

export default UserRefactoring