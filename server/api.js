const express = require('express'), app = express(), PORT = 3030
require('./main')

//This method could be improved when we have ids for each refactor
app.post('/refactorings/fixContentToViewport', (request, response) => {
    let xpath = request.params.path
    let codeForEval = fixContentToViewPort(xpath)
    response.status(200).send(codeForEval)
})

//Funcion de prueba, cambiar el colo del background
function changeBodyColor(color){
    //console.log(color);
    document.body.style.backgroundColor= color;
  }

app.post('/test', cors(), (req, res) => {
    const data = req.body;
    console.log(data.token);
    res.send(changeBodyColor.toString()+"; changeBodyColor('#025');")
  })

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))