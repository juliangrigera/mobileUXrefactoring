const express = require('express'), app = express(), PORT = 3000
const {convertFunctionToString} = require('./utils/functionsToString')
const {connect, disconnect} = require('./server/mongo')
var cors = require('cors')
const User = require('./server/User')

app.use(cors())
app.use(express.json())

const {FUNCTIONS_REFACTORING, INITIAL_FUNCTIONS} = require('./utils/refactoringsFunctions');

app.post('/test', cors(), (req, res) => {
    const data = req.body;
    console.log(data.token);
    res.send(convertFunctionToString(FUNCTIONS_REFACTORING['enlargeHitbox'], '/html/body//a', {color:'red'})) //para este ejemplo, cambia todos los links a rojo.
  })

//Applies refactorings for a token + an url (will be changed)
app.post('/refactor', cors(), async(req,res) => {
  //Request contains a user token and an url
  const data = req.body;
  const refactorings = await getRefactorings(data);

  //Forms string with code for eval function
  var stream = '';
  INITIAL_FUNCTIONS.forEach( func => stream += func.toString());
  for (r of refactorings){
    for (element of r.elements) stream += convertFunctionToString(FUNCTIONS_REFACTORING[r.refName], element, r.params);
  }
  console.log(stream);

  res.send(stream).status(200).end();
})

//Fetches refactorings to display for a token + url (will be changed)
app.post('/refactor', cors(), async(req,res) => {ç
  //Request contains a user token and an url
  const data = req.body;
  const refactorings = await getRefactorings(data);

  res.send(refactorings).status(200).end();
})

//Creates a new refactoring
app.post('/:token', cors(), async(req,res) => {
  //Request contains an url, a refactoring name, a list of xpaths and an object with parameters
  res.status(200).end();
})

async function getRefactorings({token,url}){
  connect();
  const refactorings = await User.aggregate([
    { $match: { 'token': token }}, 
    { $unwind: "$sites" }, 
    { $replaceRoot: { newRoot: "$sites" }}, 
    { $match: { 'url': url }}, 
    { $unwind: "$refacs" },
    { $replaceRoot: { newRoot: "$refacs" }}
  ]).catch( e => {
    return console.error(e);
  });
  disconnect();

  return refactorings;
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))