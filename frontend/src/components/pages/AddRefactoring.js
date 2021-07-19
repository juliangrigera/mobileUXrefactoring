import React from 'react'
import Header from "./../layout/Header";
import { Container, BDiv } from 'bootstrap-4-react';
import AddRefactoringForm from '../forms/AddRefactoring';

const AddRefactoringPage = () => {
    return (
        <Container>
            <Header />
            <BDiv>
                <h4>Agregue un Refactoring a su web</h4>
                <p>Complete el siguiente formulario:</p>
                <AddRefactoringForm />
            </BDiv>
        </Container>
    )
}
export default AddRefactoringPage;