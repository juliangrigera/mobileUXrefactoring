import React, { useState, useContext} from 'react';
import { Form } from 'bootstrap-4-react';
import Refactoring from '../../../context/RefactoringContext';

const ReduceTextParams = () => {
    
    const [porcentage, setPorcentage] = useState("0")
    const context = useContext(Refactoring);

    const handleInputParams = (event) => {
        setPorcentage(event.target.value);
        context.params = {"porcentage":porcentage};
    }
        
        return (
            <Form.Group>
                <label htmlFor="porcentage">Porcentaje que desea reducir</label>
                <Form.CustomRange id="porcentage" onChange={handleInputParams} value={porcentage}/>
                <p>{porcentage}</p>
            </Form.Group>
        )
}

export default ReduceTextParams;