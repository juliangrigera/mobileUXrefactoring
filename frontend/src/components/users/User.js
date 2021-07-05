import React, { useEffect, useState } from "react";
//import { useHistory } from 'react-router';


function Users() {
    const [users, setUsers] = useState([]);
    //const history = useHistory();
    useEffect(() => {
        getData().then(data => setUsers(data)).catch(e => console.log(e))
    }, [])
    const getData = async () => {
        console.log(localStorage.getItem('token'));
        const response = await fetch('/users', {
            headers:{"authorization": localStorage.getItem('token')}
        });
        const body = await response.json();
        console.log(body);
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    return (<div><ul>
        <li>{users["clave"]}</li></ul>
    </div>)
}

export default Users;