const express = require('express'), app = express(), PORT = 3030
require('./main')
require('../utils/functionsToString')
const  FUNCTIONS_REFACTORING = require('../utils/refactoringsFunctions');

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
    res.send(convertFunctionToString(FUNCTIONS_REFACTORING['enlargeHitbox'], '/html/body//a', {color:'red'})) //para este ejemplo, cambia todos los links a rojo.
    //Deberiamos poder usar este metodo ya
    //res.send(changeBodyColor.toString()+"; changeBodyColor('#025');")
  })

app.post('/refactor', cors(), (req,res) => {
  const data = req.body;
  const refactors = []; //fetch de array de refactors con {token: data.token}
  const stream = '';
  for (r in refactors){
    for (element in r.elements) stream += convertFunctionToString(r.refactor, element, r.params) // problemas al pasar r.params a esta funcion?
  }
  res.send(stream)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))