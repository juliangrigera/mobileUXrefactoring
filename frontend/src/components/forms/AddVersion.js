import React, { useState } from 'react';
import { Container, Form, Button } from 'bootstrap-4-react';

const AddVersionForm = () => {
    
    const [datos, setDatos] = useState({
        name: "",
        description: "",
        tag: ""
    })

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        const response = await fetch('/versions/'+localStorage.getItem('usertoken'),
            {
                method: 'POST',
                body: JSON.stringify({
                    name: datos.name,
                    description: datos.description,
                    tag: datos.tag,
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
            alert(body.mensaje)
        }

    }

    return(
        <Container >
        <Form w="100" display="block" mx="auto" onSubmit={handleSubmit}>
            <Form.Group>
                <label htmlFor="name">Nombre</label>
                <Form.Input required name="name" type="text" id="name" onChange={handleInputChange} placeholder="Nombre de la version" />
            </Form.Group>
            <Form.Group>
                <label htmlFor="description">Descripción</label>
                <Form.Textarea name="description"  id="description" onChange={handleInputChange} placeholder="Introduzca una breve descripción" rows="5"></Form.Textarea>
            </Form.Group>
            <Form.Group>
                <label htmlFor="tag">Tag de version</label>
                <Form.Input required name="tag" type="text" id="tag" onChange={handleInputChange} placeholder="Identificador de la version"/>
            </Form.Group>
            <Button primary w="100">Agregar versión</Button>
        </Form>
    </Container>
    )
    
}
export default AddVersionForm;