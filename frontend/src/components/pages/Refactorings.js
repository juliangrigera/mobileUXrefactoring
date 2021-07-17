import React from 'react';
import {BDiv} from 'bootstrap-4-react';
import Code from '../utils/Code';
import UserRefactoring from '../users/UserRefactorings';
import Header from "./../layout/Header";
import { Container } from 'bootstrap-4-react';

function RefactoringPage(props) {
    return (
        <Container>
            <Header />
            <BDiv>
                <h4>Codigo que debera poner en la pagina que desea testear</h4>
                <Code />
                <h3> Listado de refactorings activos para esta version</h3>
                <UserRefactoring />
            </BDiv>
        </Container>
    )
}

export default RefactoringPage;