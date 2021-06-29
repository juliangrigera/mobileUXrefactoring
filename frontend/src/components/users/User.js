import React, { useEffect, useState } from "react";

function Users() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getData().then(data => setUsers(data)).catch(e => console.log(e))
    }, [])
    const getData = async () => {
        const response = await fetch('/users');
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