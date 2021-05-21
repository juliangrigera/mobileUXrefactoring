const express = require('express'), app = express(), PORT = 3030
require('./utils/functionsToString')
var cors = require('cors')
app.use(cors())

const mongoose = require('mongoose')
const {User} = require('./server/User')
const connectionString = "mongodb+srv://proyecto-alumnos:B44XgKm0dsCKDls4@mobileuxrefactoring-tes.bloqb.mongodb.net/mUXr-test?retryWrites=true&w=majority"

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
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).catch(e => console.error(e));

  const user = await User.findOne({token: data.token}, 'urls')
    .catch(e => console.error(e));
  console.log(user, typeof user)
  mongoose.connection.close();
})

//Boceto de funcion final
app.post('/refactor', cors(), async(req,res) => {
  const data = req.body;
  const refactorings = []; //fetch de array de refactors con {token: data.token}
  const stream = '';
  for (r in refactorings){
    for (element in r.elements) stream += convertFunctionToString(FUNCTIONS_REFACTORING[r.refactoring], element, r.params);
  }
  res.send(stream);
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))