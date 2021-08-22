import React, { useState, useContext} from 'react';
import { Form } from 'bootstrap-4-react';
import Refactoring from '../../../context/RefactoringContext';

const EnlargeHitboxParams = () => {
    
    const [size, setSize] = useState(0)
    const context = useContext(Refactoring);

    const handleInputParams = (event) => {
        let value = event.target.value
        setSize(value);
        context.params = {"padding":value+"em"};
        console.log(context.params);
    }
        
        return (
            <Form.Group>
                <label htmlFor="porcentage">Tamaño del Hitbox</label>
                <Form.CustomRange id="porcentage" min="0" max="5" step="0.5" onChange={handleInputParams} value={size}/>
                <p>{size+"em"}</p>
            </Form.Group>
        )
}

export default EnlargeHitboxParams;