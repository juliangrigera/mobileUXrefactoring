import React, { useState } from 'react';
import { Container, Form, Button } from 'bootstrap-4-react';
import { useHistory } from 'react-router';

const Login = () => {

    const history = useHistory();

    const [datos, setDatos] = useState({
        username: '',
        password: ''
    })

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(datos.username)
        console.log(datos.password)
        const response = await fetch('/authenticate',
            {
                method: 'POST',
                body: JSON.stringify({
                    username: datos.username,
                    password: datos.password
                }),
                headers: { "Content-Type": "application/json" }
            })
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message)
        }
        if(body.success){
            localStorage.setItem('token', body.token); //guardo el token en el localstorage
            history.replace('./user')
        }
        /*else{
            indicar el motivo de error
        }*/
        console.log(body.token);
    }


    return (
        <Container pt="5">
            <Form w="25" display="block" mx="auto" onSubmit={handleSubmit}>
                <Form.Group>
                    <label htmlFor="username">Usuario</label>
                    <Form.Input name="username" type="text" id="username" onChange={handleInputChange} placeholder="Ingrese su usuario" />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="password">Password</label>
                    <Form.Input name="password" type="password" id="password" onChange={handleInputChange} placeholder="Password" />
                </Form.Group>
                <Button primary>Ingresar</Button>
            </Form>
        </Container>
    )
}

export default Login;