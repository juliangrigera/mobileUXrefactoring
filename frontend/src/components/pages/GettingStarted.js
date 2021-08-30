import React from 'react'
import Header from "./../layout/Header";
import { Container, BDiv } from 'bootstrap-4-react';
import Code from '../utils/Code';
import GenerateToken from '../forms/GenerateToken';

const GettingStartedPage = () => {
    return (
        <Container>
            <Header />
            <BDiv>
                <Code />
                <GenerateToken />
            </BDiv>
        </Container>
    )
}
export default GettingStartedPage;