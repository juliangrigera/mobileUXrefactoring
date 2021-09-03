import React, { useState} from 'react';
import { Form } from 'bootstrap-4-react';

const ReduceTextParams = (props) => {
    const [value, setValue] = useState(props.value !== undefined ? props.value : {"porcentage":0});

    const handleInputParams = (event) => {
        setValue({"porcentage":event.target.value});
        const func = props.bind;
        func({"porcentage":event.target.value});
    }
    console.log(value);
        return (
            <Form.Group>
                <label htmlFor="porcentage">Porcentaje que desea reducir</label>
                <Form.CustomRange id="porcentage" onChange={handleInputParams} value={value.porcentage}/>
                 <p>{value.porcentage}</p>
            </Form.Group>
        )
}

export default ReduceTextParams;