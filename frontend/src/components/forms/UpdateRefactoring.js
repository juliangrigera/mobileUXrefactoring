import React, { useState,  useEffect} from 'react';
import { Container, Form, Button } from 'bootstrap-4-react';


//PARAMS COMPONENTS
import ReduceTextParams from './params/ReduceTextParams';
import EnlargeHitboxParams from './params/EnlargeHitboxParams';

const UpdateForm = (props) => {
    
    //const xpathString = elementsXpathToString(props.refactoring.elements);

    console.log(props.refactoring)

    const elementsXpathToString = (vector) => {
        let cadena='';
        vector.forEach(element => {
           cadena += element+';' 
        });
        return cadena;
    }

    const [datos, setDatos] = useState({
        xpath: '',
        parameters: JSON.stringify(props.refactoring.params)
    })

    useEffect(()=> {
        setDatos({xpath:elementsXpathToString(props.refactoring.elements), parameters: props.refactoring.params});
        console.log(props.refactoring.elements)
    },[props.refactoring.elements, props.refactoring.params]) 

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
        console.log(datos)
        const response = await fetch('/refactorings/update/'+localStorage.getItem('usertoken'),
            {
                method: 'PUT',
                body: JSON.stringify({
                    xpath: elementsXpathToArray(datos.xpath),
                    parameters: datos.parameters,
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
        console.log(body);
        
    }

    const bindingParams = (value) => {
        setDatos({ ...datos, parameters:value});
    }

    
    const elementsXpathToArray= (cadena) => {
        let subCadena = cadena.replace(/\s+/g, '');
        subCadena = subCadena.substring(0,subCadena.length-1); // saco el ultimo ; para que no quede una carga vacia
        return subCadena.split(";");
    }

    const showParamsComponents = (value) => {
        switch (props.refactoring.refName) {
            case "reduceText":
                return <ReduceTextParams value={value} bind={bindingParams}/>
            case "enlargeHitbox":
                return <EnlargeHitboxParams value={value} bind={bindingParams}/>
            default:
                return <p><strong>Este Refactoring NO lleva parametros</strong></p>
        }
    }




    //console.log(elementsXpathToArray(""))

    return(
        <Container >
        <Form w="100" display="block" mx="auto" onSubmit={handleSubmit}>
            <Form.Group>
                <label htmlFor="xpath">XPath</label>
                <Form.Input name="xpath" type="text" id="xpath" onChange={handleInputChange} placeholder="ej: /html/body//a" value={datos.xpath} />
            </Form.Group>
            {showParamsComponents(props.refactoring.params)}
            <Button primary w="100">Actualizar</Button>
        </Form>
    </Container>
    )
    
}
export default UpdateForm;