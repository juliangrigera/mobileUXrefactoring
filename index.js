import Axios from 'axios'
let xpath = ""

//FixContentToViewport
Axios
    .post('/refactorings/fixContentToViewport', { path: xpath })
    .then( response => {
        eval(response)
    });