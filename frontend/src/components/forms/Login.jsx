import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'bootstrap-4-react';
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
            localStorage.setItem('usertoken',  body.userToken) //guardo el token de usuario (el personal)
            localStorage.setItem('username', body.user.username);
            history.replace('./gettingStarted')
        }
        /*else{
            indicar el motivo de error
        }*/
        console.log(body.token);
    }


    return (
        <Container pt="5">
            <Card style={{ width: '18rem' }} mx="auto">
                <Card.Header style={{'text-align': 'center'}}>
                    <Card.Title>‎
                        Inicia sesión‎
                    </Card.Title>
                </Card.Header>
                <Card.Body style={{'text-align': 'center'}}>
                    <Form display="block" mx="auto" onSubmit={handleSubmit}>
                        <Form.Group>
                            <label htmlFor="username"><h6>Usuario</h6></label>
                            <Form.Input name="username" type="text" id="username" onChange={handleInputChange} placeholder="Ingrese su usuario" />
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="password"><h6>Password</h6></label>
                            <Form.Input name="password" type="password" id="password" onChange={handleInputChange} placeholder="Password" />
                        </Form.Group>
                        <Button style={{ width: '100%' }} primary>Ingresar</Button>
                    </Form>
                </Card.Body>
                <Card.Footer style={{'text-align': 'center'}}>
                    <Card.Link href="#">‎Crear cuenta‎</Card.Link>
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default Login;