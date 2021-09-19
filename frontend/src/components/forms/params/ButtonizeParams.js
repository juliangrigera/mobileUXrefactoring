import React, { useState } from 'react';
import { Form, Row, Col } from 'bootstrap-4-react';
import { Figure } from 'bootstrap-4-react/lib/components';


const ButtonizeParams = (props) => {
    const [type, setType] = useState(props.value !== undefined ? props.value : { value: 0 })

    const handleInputParams = (event) => {
        //let value = event.target.value
        
        setType({ "value": event.target.value });
        const func = props.bind;
        func({ "value": event.target.value});
        console.log(event.target.value)
    }
    console.log(type)
    const img_src = '../img/';
    
    return (
        <Form.Group style={{ 'text-align': 'center' }}>
            {/*-----Figure Normal ------
            <Figure.Image src={img_src+'normal.png'}/>
            <Figure.Caption>Normal</Figure.Caption> 
            --------------------------*/}
            <Row>
                <Col col="12 md-4">
                    <Figure.Image src={img_src + 'btsimple.png'} />
                    <Form.Check inline>
                        <Form.Radio id="inlineRadio1" name="inlineRadioOptions" value="0" onClick={handleInputParams} defaultChecked />
                        <Form.CheckLabel htmlFor="inlineRadio1">Buttonize Simple</Form.CheckLabel>
                    </Form.Check>
                </Col>
                <Col col="12 md-4">
                    <Figure.Image src={img_src + 'btshaded.png'} />
                    <Form.Check inline>
                        <Form.Radio id="inlineRadio2" name="inlineRadioOptions" value="1" onClick={handleInputParams} />
                        <Form.CheckLabel htmlFor="inlineRadio2">Buttonize Shaded</Form.CheckLabel>
                    </Form.Check>
                </Col>
                <Col col="12 md-4">
                    <Figure.Image src={img_src + 'btsolid.png'} />
                    <Form.Check inline>
                        <Form.Radio id="inlineRadio3" name="inlineRadioOptions" value="2" onClick={handleInputParams} />
                        <Form.CheckLabel htmlFor="inlineRadio3">Buttonize Solid</Form.CheckLabel>
                    </Form.Check>
                </Col>
            </Row>
        </Form.Group>
    )
}

export default ButtonizeParams;