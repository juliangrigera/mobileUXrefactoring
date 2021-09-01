import React from 'react';
const Refactoring = React.createContext({
    _id: -1,
    refName: '',
    elements: [],
    params: {},
    versions: [] //valores por defecto
});
export default Refactoring;
