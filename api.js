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

app.post('/refactor', cors(), async(req,res) => {
  const data = req.body;
  
  //fetch
  connect()
  const refactorings = await User.aggregate([
    { $match: { 'token': data.token }}, 
    { $unwind: "$sites" }, 
    { $replaceRoot: { newRoot: "$sites" }}, 
    { $match: { 'url': data.url }}, 
    { $unwind: "$refacs" },
    { $replaceRoot: { newRoot: "$refacs" }}
  ]).catch( e => {
    return console.error(e)
  });
  disconnect()

  var stream = '';
  for (r of refactorings){
    console.log(r)
    for (element of r.elements) stream += convertFunctionToString(FUNCTIONS_REFACTORING[r.refName], element, r.params);
  }
  
  res.send(stream).status(200)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))