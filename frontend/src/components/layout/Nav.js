import React, { Component } from 'react';
import { Navbar, Nav, Dropdown } from 'bootstrap-4-react';

export default class NavPrimary extends Component {
    render() {
        return (
            <Navbar expand="lg" dark bg="dark" mb="3">
                <Navbar.Brand href="#">RE-FAC</Navbar.Brand>
                <Navbar.Toggler target="#navbarColor1" />
                <Navbar.Nav mr="auto">
                    <Nav.ItemLink active href="/user">Home</Nav.ItemLink>
                    <Nav.Item dropdown>
                        <Nav.Link dropdownToggle>Refactoring</Nav.Link>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/gettingStarted" >Empezando</Dropdown.Item>
                            <Dropdown.Item href="/refactorings">Detalles</Dropdown.Item>
                            <Dropdown.Item href="/addRefactoring">Agregar Nuevo</Dropdown.Item>
                        </Dropdown.Menu>
                    </Nav.Item>
                </Navbar.Nav>
            </Navbar>
        )
    }
}