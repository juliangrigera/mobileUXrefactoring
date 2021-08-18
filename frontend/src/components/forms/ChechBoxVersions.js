import React, {useState,useEffect, useContext} from 'react';
import {  Form } from 'bootstrap-4-react';
import Refactoring from '../../context/RefactoringContext';


const CheckBoxVersions = () => {

    const [versions, setVersions] = useState([]);
    const context = useContext(Refactoring);

    const handleInputChange = (event) => {
        context.versions.push(event.target.value);
    }

    useEffect(() => {
        getData().then(data => {setVersions(data)}).catch(e => console.log(e));
        console.log("hola");
    }, [])
    const getData = async () => {
        const response = await fetch('/versions/' + localStorage.getItem('usertoken'),
        {
            method: 'GET',
            headers: {
                "authorization": localStorage.getItem('token')
            }
        })
        const body = await response.json();
        if(response.status !== 200){
            throw Error(body.message)
        }
        console.log(response)
        console.log(body);
        return body.versions;
    }

    const checkItems = (versions) => {
        const result = versions.map((version) => 
            <Form.Check inline>
                <Form.Checkbox id={version.tag+"Checkbox"} value={version.tag} onChange={handleInputChange} />
                <Form.CheckLabel htmlFor={version.tag+"Checkbox"}>{version.tag}</Form.CheckLabel>
            </Form.Check>
        )
        return result;
    }
    
    return(<Form.Group>
         {versions.length > 0 ?
                            checkItems(versions)
                            : <option>loading...</option>
                        }
    </Form.Group>)
}

export default CheckBoxVersions;