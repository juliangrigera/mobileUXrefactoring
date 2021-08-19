import React, { useState } from 'react';
import { Container, Form, Button } from 'bootstrap-4-react';

const UpdateForm = (props) => {
    
    //const xpathString = elementsXpathToString(props.refactoring.elements);

    const [datos, setDatos] = useState({
        xpath: [],
        parameters: JSON.stringify(props.refactoring.params)
    })

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(datos.xpath)
        console.log(datos.parameters)
        const response = await fetch('/refactorings/update/'+localStorage.getItem('token'),
            {
                method: 'PUT',
                body: JSON.stringify({
                    xpath: elementsXpathToArray(datos.xpath),
                    parameters: datos.parameters,
                    usertoken: localStorage.getItem('usertoken'),
                    refactoring: props.refactoring
                }),
                headers: { "Content-Type": "application/json", 
                            "authorization": localStorage.getItem('token') }
            })
        const body = await response.json();
        if (!body.success && body.success!=='undefined') {
            if(body.status===403){
                localStorage.removeItem('token');
                localStorage.removeItem('usertoken');
            }
            throw Error(body.message)
        }
        /*if(body.success){
            
        }
        else{
            indicar el motivo de error
        }*/
        console.log(body.token);
        
    }
    console.log(props.refactoring)

    
    const elementsXpathToArray= (cadena) => {
        let subCadena = cadena.replace(/\s+/g, '');
        subCadena = subCadena.substring(0,subCadena.length-1); // saco el ultimo ; para que no quede una carga vacia
        return subCadena.split(";");
    }

    const elementsXpathToString = (vector) => {
        let cadena='';
        vector.forEach(element => {
           cadena += element+';' 
        });
        return cadena;
    }


    //console.log(elementsXpathToArray(""))

    return(
        <Container >
        <Form w="100" display="block" mx="auto" onSubmit={handleSubmit}>
            <Form.Group>
                <label htmlFor="xpath">XPath</label>
                <Form.Input name="xpath" type="text" id="xpath" onChange={handleInputChange} placeholder="ej: /html/body//a" value={datos.xpath} />
            </Form.Group>
            <Form.Group>
                <label htmlFor="parameters">Parametros</label>
                <Form.Textarea name="parameters" id="parameters" onChange={handleInputChange} value={datos.parameters} rows="5"></Form.Textarea>
            </Form.Group>
            <Button primary w="100">Actualizar</Button>
        </Form>
    </Container>
    )
    
}
export default UpdateForm;