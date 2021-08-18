import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Button } from 'bootstrap-4-react';
import { useHistory } from 'react-router';
import CheckBoxVersions from './ChechBoxVersions';
import Refactoring from '../../context/RefactoringContext';

const AddRefactoringForm = () => {

    const history = useHistory();

    const context = useContext(Refactoring)

    const [refactorings, setRefactorings] = useState([]);

    const [datos, setDatos] = useState({
        refName: '',
        elements: [],
        params: {},
        versions: []
    })
    //Convierte los elementos de un string en un array usando como separador el ";"
    const elementsXpathToArray = (cadena) => {
        let subCadena = cadena.replace(/\s+/g, '');
        subCadena = subCadena.substring(0, subCadena.length - 1); // saco el ultimo ; para que no quede una carga vacia
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
        console.log(context)
        let elementsArray = elementsXpathToArray(datos.elements);
        console.log(elementsArray);
        setDatos({
            ...datos,
            'elements': elementsArray
        })
        console.log(typeof (datos.params))
        let paramsJSON = JSON.parse(datos.params);
        const response = await fetch('/refactorings/' + localStorage.getItem('usertoken'),
            {
                method: 'POST',
                body: JSON.stringify({
                    refName: datos.refName,
                    elements: elementsArray,
                    params: paramsJSON,
                    versions: context.versions
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
        else {
            history.replace('./refactorings');
        }
        // console.log(body.token);
    }

    useEffect(() => {
        getData().then(data => setRefactorings(data.refactorings)).catch(e => console.log(e))
    }, [])
    const getData = async () => {
        //console.log(localStorage.getItem('token'));
        const response = await fetch('/refactorings/all');
        const body = await response.json();
        console.log(body);
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };
    //Devuelve la lista de nombres de los refactorings para las opciones del campo select
    const refactoringsNames = (refactoringsArray) => {
        const result = refactoringsArray.map((name) =>
            <option>{name}</option>
        )
        return result;
    }
    

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <CheckBoxVersions />
                <Form.Group>
                    <label htmlFor="refName">Refactoring:</label>
                    <Form.Select required name="refName" id="refName" onChange={handleInputChange}  >
                        {refactorings.length > 0 ?
                            refactoringsNames(refactorings)
                            : <option>loading...</option>
                        }
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