const express = require('express'), app = express(), PORT = 3001
const { convertFunctionToString } = require('./utils/functionsToString')
const { connect, disconnect } = require('./server/mongo')
var cors = require('cors')
const User = require('./server/User')
const { FUNCTIONS_REFACTORING, INITIAL_FUNCTIONS } = require('./utils/refactoringsFunctions')
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

app.post('/authenticate', cors(), async (req, res) => {
  const userTemp = await getUser(req.body.username, req.body.password)
  if (userTemp != false) {
    const user = userTemp[0];
    const payload = {
      usuario: user.username
    };
    console.log(user)
    const token = generateAccessToken(payload);
    res.json({
      mensaje: 'Autenticación correcta',
      token: token,
      userToken: user.userToken,
      success: true
    });
  } else {
    res.json({
      mensaje: "Usuario o contraseña incorrectos",
      success: false
    })
  }
})


//Applies refactorings for a user token
app.post('/refactor', cors(), async (req, res) => {
  //Request contains a user token
  const data = req.body;
  const refactorings = await getRefactorings(data);

  //Forms string with code for eval function
  var stream = '';
  INITIAL_FUNCTIONS.forEach(func => stream += func.toString());
  for (r of refactorings) {
    for (element of r.elements) stream += convertFunctionToString(FUNCTIONS_REFACTORING[r.refName], element, r.params);
  }
  console.log(stream);

  res.send(stream).status(200).end();
})

//Fetches refactorings to display for a token
app.post('/refactorings', cors(), async (req, res) => {
  //Request contains a user token
  const data = req.body;
  const refactorings = await getRefactorings(data);

  res.send(refactorings).status(200).end();
})

//Creates a new refactoring, taking a user token by params and the refactoring in the request
app.post('/refactorings/:userToken', cors(), async (req, res) => {
  const data = req.body;
  let newRefactoring = new Refactoring({
    refName: data.refName,
    elements: data.elements,
    params: data.params
  })
  connect()
  await User.findOneAndUpdate(
    { token: req.params.userToken },
    { $push: { refactorings: newRefactoring } },
    (err, suc) => {
      if (err) {
        console.log(err)
        disconnect()
        res.status(300).end()
      } else {
        disconnect()
        res.send(suc).status(200).end()
      }
    }
  )
})

async function getRefactorings({ token }) {
  connect();
  const refactorings = await User.aggregate([
    { $match: { 'token': token } },
    { $unwind: "$refactorings" },
    { $replaceRoot: { newRoot: "$refactorings" } }
  ]).catch(e => {
    return console.error(e);
  });
  disconnect();

  return refactorings;
}

app.get('/refactorings/:userToken', authenticateToken, cors(), async (req, res) => {
  const refactorings = await getRefactorings(req.params.userToken);
  res.json(refactorings).status(200).end();

})

app.get('/users/:userToken', authenticateToken, cors(), async (req, res) => {
  //const refactorings = await getRefactorings(req.params.userToken);
  console.log(req.params.userToken)
  const user = await getUserByToken(req.params.userToken)
  res.json(user[0]).status(200).end();

})

async function getUserByToken(token) {
  connect();
  const user = await User.find({ 'userToken' : token }).catch(() => { user = false })
  disconnect();
  return user;
}


async function getUser(username, password) {
  connect();
  const user = await User.find({ 'username': username, 'password': password }).catch(() => { user = false })
  disconnect();
  return user;
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


