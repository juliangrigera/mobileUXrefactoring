import React  from "react";
import User from "./../users/User"
import Header from "./Header";
import { Container } from 'bootstrap-4-react';


const Layout = () => {
    return (
        <Container >
            <Header />
            <User />
        </Container>
    )
}

export default Layout;