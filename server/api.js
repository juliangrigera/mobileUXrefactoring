const express = require('express'), app = express(), PORT = 3030
require('./main')

//This method could be improved when we have ids for each refactor
app.post('/refactorings/fixContentToViewport', (request, response) => {
    let xpath = request.params.path
    let codeForEval = fixContentToViewPort(xpath)
    response.status(200).send(codeForEval)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))