import React, { Component } from 'react';
import { Navbar, Nav } from 'bootstrap-4-react';
import { BsPeopleCircle} from "react-icons/bs";


export default class NavPrimary extends Component {

    username =  localStorage.getItem('username');

    render() {
        return (
            <Navbar expand="lg" dark bg="dark" mb="3">
                <Navbar.Brand href="#">MobUX</Navbar.Brand>
                <Navbar.Toggler target="#navbarColor1" />
                <Navbar.Nav mr="auto">
                    <Nav.ItemLink active href="/gettingStarted">Comenzando</Nav.ItemLink>
                    <Nav.ItemLink active href="/refactorings">Refactorings</Nav.ItemLink>
                    <Nav.ItemLink active href="/addRefactoring">Agregar Nuevo</Nav.ItemLink>
                </Navbar.Nav>
                <Navbar.Nav>
                
               <Nav.ItemLink href="#"> <BsPeopleCircle />    {this.username}</Nav.ItemLink>
                </Navbar.Nav>
            </Navbar>
        )
    }
}