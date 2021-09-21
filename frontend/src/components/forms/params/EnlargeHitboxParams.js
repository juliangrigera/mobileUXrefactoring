import React, { useState } from 'react';
import { Form } from 'bootstrap-4-react';

const EnlargeHitboxParams = (props) => {
    const [size, setSize] = useState(props.value !== undefined ? props.value : { padding: 0 })
    const [check, setCheck] = useState(false);

    const handleCheckBox = (event) => {
        setCheck(event.target.checked);
        console.log(check +' '+ event.target.checked)
    }

    const handleInputParams = (event) => {
        const func = props.bind;
        if (check) {
            setSize({ "transform": "scale("+event.target.value+")" });
            func({ "transform": "scale("+event.target.value+")" });
        } else {
            setSize({ "padding": event.target.value });
            func({ "padding": event.target.value + "em" });
        }
    }
    console.log(size);
    return (
        <Form.Group>
            <Form.Check>
                <Form.CheckInput type="checkbox" id="check" onChange={handleCheckBox} />
                <Form.CheckLabel htmlFor="check">Marcar si se desea aplicar sobre CheckBox/RadioButton</Form.CheckLabel>
            </Form.Check>
            <label htmlFor="porcentage">Tamaño del Hitbox</label>
            <Form.CustomRange id="porcentage" min="0" max="5" step="0.5" onChange={handleInputParams} value={size.padding} />
            <p>{(check) ? size.transform : size.padding + "em"}</p>
        </Form.Group>
    )
}

export default EnlargeHitboxParams;