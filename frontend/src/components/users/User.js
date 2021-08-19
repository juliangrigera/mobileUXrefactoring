import React, {useEffect, useState } from "react";
import {BDiv} from 'bootstrap-4-react';
//import { useHistory } from 'react-router';

function Users() {
    const [user, setUsers] = useState([]);
    //const history = useHistory();
    useEffect(() => {
        getData().then(data => setUsers(data)).catch(e => console.log(e))
    }, [])
    const getData = async () => {
        //console.log(localStorage.getItem('token'));
        const response = await fetch('/users/'+localStorage.getItem('usertoken'), {
            headers:{"authorization": localStorage.getItem('token')}
        });
        const body = await response.json();
        console.log(body);
        if ( body.success!=='undefined' && !body.success ) {
            if(body.status===403){
                localStorage.removeItem('token');
                localStorage.removeItem('usertoken');
            }
            throw Error(body.message)
        }
        return body.user;
    };

    return (
        <BDiv mt="5" >
            <h1 className="text-center">Hola!!!</h1>
            <p className="text-center">Bienvenido <span className="font-weight-bold">{user.username}</span></p>
        </BDiv>
)
}

export default Users;