import React, { useState} from 'react';
import { Form } from 'bootstrap-4-react';

const EnlargeHitboxParams = (props) => {
    const [size, setSize] = useState(props.value !== undefined ? props.value : {padding: 0})

    const handleInputParams = (event) => {
        //let value = event.target.value
        setSize({"padding":event.target.value});
        const func = props.bind;
        func({"padding":event.target.value+"em"});
    }
    console.log(size);
        return (
            <Form.Group>
                <label htmlFor="porcentage">Tamaño del Hitbox</label>
                <Form.CustomRange id="porcentage" min="0" max="5" step="0.5" onChange={handleInputParams} value={size.padding}/>
                <p>{size.padding+"em"}</p>
            </Form.Group>
        )
}

export default EnlargeHitboxParams;