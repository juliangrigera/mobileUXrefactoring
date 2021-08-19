import React from 'react';
import {BDiv} from 'bootstrap-4-react';
import Code from '../utils/Code';
import Header from "./../layout/Header";
import { Container } from 'bootstrap-4-react';
import GenerateToken from '../forms/GenerateToken';
import ShowVersions from '../users/versions/ShowVersions';

function RefactoringPage(props) {
    return (
        <Container>
            <Header />
            <BDiv>
                <Code />
               
                <GenerateToken />
                
                <ShowVersions />
            </BDiv>
        </Container>
    )
}

export default RefactoringPage;