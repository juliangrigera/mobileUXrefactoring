const express = require('express'), app = express(), PORT = 3001
const { connect, disconnect } = require('./server/mongo')
var cors = require('cors')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const {refacsRouter} = require('./server/refactorings_routes')
const refactorings_routes = require('./server/refactorings_routes')

/*------app.use-------*/
app.use(cors())
app.use(express.json())
app.use('/refactorings', refactorings_routes)

// get config vars
dotenv.config();
// access config var
process.env.TOKEN_SECRET;

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1440s' });
}

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET.toString(), (err, user) => {
    //console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

//Authenticates a user attempting to log-in, fetches their userToken and genrates an access token
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

function generateToken(length) {
  let rand = () => Math.random(0).toString(36).substr(2);
  return (rand() + rand() + rand() + rand()).substr(0, length)
}

//Generated a new token
app.post('/user/generateToken/:userToken', authenticateToken, cors(), async (req, res) => {

  let newToken = generateToken(32);
  console.log(newToken);
  connect()
  await User.findOneAndUpdate(
    { userToken: req.params.userToken },
    { $set: { userToken: newToken } },
    (err, suc) => {
      if (err) {
        console.log(err)
        disconnect()
        res.json({
          mensaje: err,
          success: false
        }).status(300).end()
      } else {
        disconnect()
        res.json({
          mensaje: suc,
          success: true,
          token: newToken
        }).status(200).end()
      }
    }
  )

})

//Gets the user data for a given token
app.get('/users/:userToken', authenticateToken, cors(), async (req, res) => {
  //const refactorings = await getRefactorings(req.params.userToken);
  console.log(req.params.userToken)
  const user = await getUserByToken(req.params.userToken)
  res.json(user[0]).status(200).end();
})


/*---Utility---*/
async function getUserByToken(token) {
  connect();
  const user = await User.find({ 'userToken': token }).catch(() => { user = false })
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