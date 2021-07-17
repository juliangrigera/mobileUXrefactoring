import React, { Component } from 'react';
import { Navbar, Nav } from 'bootstrap-4-react';

export default class NavPrimary extends Component {
  render() {
      return (
          <Navbar expand="lg" dark bg="dark" mb="3">
              <Navbar.Brand href="#">RE-FAC</Navbar.Brand>
              <Navbar.Toggler target="#navbarColor1" />
              <Navbar.Nav mr="auto">
                  <Nav.ItemLink active href="/user">Home</Nav.ItemLink>
                  <Nav.ItemLink href="/refactorings">Refactorings</Nav.ItemLink>
              </Navbar.Nav>
          </Navbar>
      )
  }
}