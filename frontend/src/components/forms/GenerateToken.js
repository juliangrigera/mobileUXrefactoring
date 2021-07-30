import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'bootstrap-4-react';

const GenerateToken = () => {
    const [token, setToken] = useState(localStorage.getItem('usertoken'))
    //conectar con el backend
    const generateNewToken = async () => {
        const response = await fetch('/user/generateToken/' + localStorage.getItem('usertoken'), {
            method: 'POST',
            headers: { "authorization": localStorage.getItem('token') }
        });
        const body = await response.json();
        console.log(body);
        //obtener la respuesta
        if (response.status !== 200) {
            //Si, informar del error
            throw Error(body.message)
        } else {
            if (body.success) {
                localStorage.setItem('usertoken', body.token) //guardo el token de usuario (el personal)
                console.log(localStorage.getItem('usertoken'));
                setToken(body.token)
            }
        }
        return body;
    }

    //Copiar el contenido del input en el portapapeles
    const copyToClickBoard = () => {
        let texto = document.getElementById("token").value;

        navigator.clipboard.writeText(texto)
            .then(() => {
                console.log("Texto copiado en el portapapeles...")
            })
            .catch(err => {
                console.log('Error: ', err);
            })
    }

    return (
        <InputGroup mb="3">
            <Form.Input id="token" type="text" value={token} readonly />
            <InputGroup.Append>
                <Button outline secondary onClick={() => copyToClickBoard()}>Copiar</Button>
                <Button outline secondary onClick={() => generateNewToken()}>Generar Token</Button>
            </InputGroup.Append>
        </InputGroup>
    )
}

export default GenerateToken;