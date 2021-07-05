const express = require('express'), app = express(), PORT = 3001
const {convertFunctionToString} = require('./utils/functionsToString')
const {connect, disconnect} = require('./server/mongo')
var cors = require('cors')
const User = require('./server/User')
const {FUNCTIONS_REFACTORING, INITIAL_FUNCTIONS} = require('./utils/refactoringsFunctions')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')


/*------app.use-------*/
app.use(cors())
app.use(express.json())



// get config vars
dotenv.config();
// access config var
process.env.TOKEN_SECRET;

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1440s' });
}

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']
  console.log(token);
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET.toString(), (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

app.post('/authenticate', cors(), (req, res) => {
  console.log(req)
  if (req.body.username === "AleValdez" && req.body.password === "123456") {
    const user = req.body.username;
    const payload = {
      usuario : user
    };
    console.log(user)
    const token = generateAccessToken(payload);
    res.json({
      mensaje: 'Autenticación correcta',
      token: token,
      success: true
    });
  } else {
    res.json({ mensaje: "Usuario o contraseña incorrectos",
              success: false })
  }
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
  //No estaria pudiendo hacer andar esto, voy a tener que refactorizar la db a como hablamos
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

app.get('/users', authenticateToken, cors(), async(req,res) => {
  const u = await getUser("juan_refactor", "12341234")
  console.log(u);
  res.json({
    "clave": "prueba"
  })
})

async function getUser({username,password}){
  connect();
  const user = await User.aggregate([
    { $match: { 'username': username }}, 
    { $unwind: "$username" }, 
    { $replaceRoot: { newRoot: "$username" }}, 
    { $match: { 'password': password }}, 
    { $unwind: "$password" },
    { $replaceRoot: { newRoot: "$password" }}
  ]).catch( e => {
    return console.error(e);
  });
  disconnect();

  return user;
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


