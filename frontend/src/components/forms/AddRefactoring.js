import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Button, Alert } from 'bootstrap-4-react';
import { useHistory } from 'react-router';
import CheckBoxVersions from './ChechBoxVersions';
import ReduceTextParams from './params/ReduceTextParams';
import EnlargeHitboxParams from './params/EnlargeHitboxParams';

const AddRefactoringForm = () => {

    const history = useHistory();

    const [refactorings, setRefactorings] = useState([]);

    const [refDes, setRefDes] = useState([]);

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
        let elementsArray = elementsXpathToArray(datos.elements);
        console.log(elementsArray);
        setDatos({
            ...datos,
            'elements': elementsArray
        })
        console.log(datos.params)
        const response = await fetch('/refactorings/' + localStorage.getItem('usertoken'),
            {
                method: 'POST',
                body: JSON.stringify({
                    refName: datos.refName,
                    elements: elementsArray,
                    params: datos.params,
                    versions: datos.versions
                }),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                }
            })
        //console.log(response);
        const body = await response.json();
        if (!body.success && body.success !== 'undefined') {
            if (body.status === 403) {
                localStorage.removeItem('token');
                localStorage.removeItem('usertoken');
            }
            throw Error(body.message)
        }
        else {
            history.replace('./refactorings');
        }
        // console.log(body.token);
    }

    useEffect(() => {
        getData().then(data => { setRefactorings(data.refactorings); setRefDes(data.descriptions) }).catch(e => console.log(e))
    }, [])
    const getData = async () => {
        //console.log(localStorage.getItem('token'));
        const response = await fetch('/refactorings/all');
        const body = await response.json();
        console.log(body);
        if (!body.success && body.success !== 'undefined') {
            if (body.status === 403) {
                localStorage.removeItem('token');
                localStorage.removeItem('usertoken');
            }
            throw Error(body.message)
        }
        return body;
    };
    //Devuelve la lista de nombres de los refactorings para las opciones del campo select
    const refactoringsNames = (refactoringsArray) => {
        const result = [];
        refactoringsArray.forEach((name, index) =>
            result.push(<option>{name}</option>)
        )
        return result;
    }

    const bindingParams = (value) => {
        setDatos({ ...datos, params: value });
    }
    const bindingVersion = (value) => {
        setDatos({ ...datos, versions: value });
    }
    //Devolver el componente de parametros de acuerdo al Refactoring elegido en el select
    const showParamsComponents = (value) => {
        switch (datos.refName) {
            case "reduceText":
                return <ReduceTextParams value={value} bind={bindingParams} />
            case "enlargeHitbox":
                return <EnlargeHitboxParams value={value} bind={bindingParams} />
            default:
                return <p><strong>Este Refactoring NO lleva parametros</strong></p>
        }
    }

    //Devolver la descripcion de los refactoring
    const showDescription = () => {
        let res = ""
        try {
            res = refDes.find(elem => elem.name === datos.refName).description
        } catch (error) {
            console.log(error)
        }
        return (<p>{res}</p>);

    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <CheckBoxVersions bind={bindingVersion} />
                <Form.Group>
                    <label htmlFor="refName"><strong>Refactoring:</strong></label>
                    <Form.Select required name="refName" id="refName" onChange={handleInputChange}  >
                        <option>Elija un refactoring</option>
                        {refactorings.length > 0 ?
                            refactoringsNames(refactorings)
                            : <option>loading...</option>
                        }
                    </Form.Select>
                    <Alert info>
                        {showDescription()}</Alert>
                </Form.Group>
                <Form.Group>
                    <label htmlFor="elements"><strong>XPaths</strong></label><br />
                    <small className="text-info">Los Path deben estan separados por ";".(ej: /html/body//a; /div/a//p;)</small>
                    <Form.Input required name="elements" type="text" id="elements" onChange={handleInputChange} placeholder="ej: /html/body//a; /div/a//p;" />
                </Form.Group>
                {showParamsComponents()}
                <Button primary>Guardar</Button>
            </Form>
        </Container>
    )
}

export default AddRefactoringForm;