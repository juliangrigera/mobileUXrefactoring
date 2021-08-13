import React from 'react';
import {BDiv} from 'bootstrap-4-react';
import Code from '../utils/Code';
import Header from "./../layout/Header";
import QR from '../utils/qr'
import { Container } from 'bootstrap-4-react';
import GenerateToken from '../forms/GenerateToken';
import ShowVersions from '../users/versions/ShowVersions';

function RefactoringPage(props) {
    return (
        <Container>
            <Header />
            <BDiv>
                <h4>Codigo que debera poner en la pagina que desea testear</h4>
                <Code />
                <h3>Genere un nuevo token para poner en su web</h3>
                <GenerateToken />
                <h3> Versiones con los refactorings aplicados a cada una de ellas</h3>
                <ShowVersions />
            </BDiv>
        </Container>
    )
}

export default RefactoringPage;