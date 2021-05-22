const express = require('express'), app = express(), PORT = 3000
const {convertFunctionToString} = require('./utils/functionsToString')
const {connect, disconnect} = require('./server/mongo')
var cors = require('cors')
const User = require('./server/User')

app.use(cors())
app.use(express.json())

const FUNCTIONS_REFACTORING = require('./utils/refactoringsFunctions');

//Funcion de prueba, cambiar el colo del background
function changeBodyColor(color){
    //console.log(color);
    document.body.style.backgroundColor= color;
  }

app.post('/test', cors(), (req, res) => {
    const data = req.body;
    console.log(data.token);
    res.send(convertFunctionToString(FUNCTIONS_REFACTORING['enlargeHitbox'], '/html/body//a', {color:'red'})) //para este ejemplo, cambia todos los links a rojo.
  })

app.post('/connectiontest', cors(), async(req,res) => {
  const data = req.body;
  connect()

  //fetch
  const refactorings = await User.aggregate([
    { $match: { 'token': data.token }}, 
    { $unwind: "$urls" }, 
    { $replaceRoot: { newRoot: "$urls" }}, 
    { $match: { 'url': data.url }}, 
    { $unwind: "$refactorings" },
    { $replaceRoot: { newRoot: "$refactorings" }}
  ]).catch( e => {
    return console.error(e)
  });
  
  console.log(refactorings[1].elements)
  var stream = '';
  for (r of refactorings){
    console.log(r)
    for (element of r.elements) stream += convertFunctionToString(FUNCTIONS_REFACTORING[r.refactoring], element, r.params);
  }

  disconnect()
  res.send(stream).status(200)
})

//Boceto de funcion final
app.post('/refactor', cors(), async(req,res) => {
  const data = req.body;
  const refactorings = []; //fetch de array de refactors con {token: data.token}
  var stream = '';
  for (r in refactorings){
    for (element in r.elements) stream += convertFunctionToString(FUNCTIONS_REFACTORING[r.refactoring], element, r.params);
  }
  res.send(stream);
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))