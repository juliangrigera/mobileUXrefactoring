import React, { useState } from 'react';
import { Container, Form, Button } from 'bootstrap-4-react';

const AddRefactoringForm = () => {
    const [datos, setDatos] = useState({
        refName: '',
        elements: [],
        params: {}
    })

    const elementsXpathToArray= (cadena) => {
        let subCadena = cadena.replace(/\s+/g, '');
        subCadena = subCadena.substring(0,subCadena.length-1); // saco el ultimo ; para que no quede una carga vacia
        return subCadena.split(";");
    }

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(datos)
        let elementsArray= elementsXpathToArray(datos.elements);
        console.log(elementsArray);
        setDatos({
            ...datos,
            'elements':elementsArray
        })
        const response = await fetch('/refactorings/:' + localStorage.getItem('usertoken'),
            {
                method: 'POST',
                body: JSON.stringify({
                    refName: datos.refName,
                    elements:elementsArray,
                    params:datos.params
                }),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                }
            })
        console.log(response);
        //const body = await response.json();
        if (response.status !== 200) {
            throw Error()
        }
        else{
            console.log("exito");
        }
       // console.log(body.token);

    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <label htmlFor="refName">Refactoring:</label>
                    <Form.Select required name="refName" id="refName" onChange={handleInputChange}  >
                        <option>enlargeHitbox</option>
                        <option>reduceText</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <label htmlFor="elements">XPaths</label>
                    <Form.Input required name="elements" type="text" id="elements" onChange={handleInputChange} placeholder="ej: /html/body//a; /div/a//p;" />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="params">Parametros</label>
                    <Form.Textarea required name="params" id="params" onChange={handleInputChange} rows="5"></Form.Textarea>
                </Form.Group>
                <Button primary>Guardar</Button>
            </Form>
        </Container>
    )
}

export default AddRefactoringForm;