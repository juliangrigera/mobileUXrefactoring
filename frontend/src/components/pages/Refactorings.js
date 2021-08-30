import React from 'react';
import {BDiv} from 'bootstrap-4-react';
import Header from "./../layout/Header";
import { Container } from 'bootstrap-4-react';
import ShowVersions from '../users/versions/ShowVersions';

function RefactoringPage(props) {
    return (
        <Container>
            <Header />
            <BDiv>
                <ShowVersions />
            </BDiv>
        </Container>
    )
}

export default RefactoringPage;