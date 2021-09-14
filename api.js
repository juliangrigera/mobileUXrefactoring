const express = require('express'), app = express(), PORT = 3001
const mongoose = require('mongoose')
const { connect, disconnect } = require('./server/mongo')
var cors = require('cors')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { convertFunctionToString } = require('./utils/functionsToString')
const { FUNCTIONS_REFACTORING, INITIAL_FUNCTIONS } = require('./utils/refactoringsFunctions')
const { User, Version, Refactoring } = require('./server/User')
const updateQuery = require('./utils/updateQuery')

/*------app.use-------*/
app.use(cors())
app.use(express.json())

// get config vars
dotenv.config();
// access config var
process.env.TOKEN_SECRET;


/*--- User routes ---*/
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
  res.json({
    user: user[0],
    success: true
  }).status(200).end();
})




/*---Version Routes---*/
//Get versions for a user token
app.get('/versions/:userToken', authenticateToken, cors(), async (req, res) => {
  connect();
  const versions = await User.aggregate([
    { $match: { 'userToken': req.params.userToken } },
    { $unwind: "$versions" },
    { $replaceRoot: { newRoot: "$versions" } }
  ]).catch(e => {
    disconnect();
    res.json({
      mensaje: err,
      success: false
    }).status(300).end();
  });
  disconnect();
  res.json({
    versions,
    success: true
  }).status(200).end()
})

//Create new version for a user token
app.post('/versions/:userToken', authenticateToken, cors(), async (req, res) => {

  const data = req.body;
  connect();

  let newVersion = new Version({
    name: data.name,
    description: data.description,
    qrUrl: '',
    tag: data.tag
  })

  const foundVersion = await User.aggregate([
    { $match: { 'userToken': req.params.userToken } },
    { $unwind: "$versions" },
    { $replaceRoot: { newRoot: "$versions" } },
    { $match: { 'tag': data.tag } }
  ]).catch(e => console.error(e))

  if (Object.entries(foundVersion).length === 0) {

    const document = await User.find({ 'userToken': req.params.userToken }).catch((e) => console.log(e));
    newVersion.qrUrl = updateQuery(document[0].url, "version", data.tag)

    User.findOneAndUpdate(
      { userToken: req.params.userToken },
      { $push: { versions: newVersion } },
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
            success: true
          }).status(200).end()
        }
      }
    )

  } else {

    disconnect();
    res.send({
      mensaje: 'El tag debe ser único',
      success: false
    }).status(300).end();

  }

})

//Duplicate version for a user token and version ag
app.post('/versions/:userToken/:currentTag', authenticateToken, cors(), async (req, res) => {


  const data = req.body;
  let duplicatedVersion = new Version({
    name: data.name,
    description: data.description,
    qrUrl: '',
    tag: data.tag
  })

  connect();
  const foundVersion = await User.aggregate([
    { $match: { 'userToken': req.params.userToken } },
    { $unwind: "$versions" },
    { $replaceRoot: { newRoot: "$versions" } },
    { $match: { 'tag': data.tag } }
  ]).catch(e => console.error(e))

  if (Object.entries(foundVersion).length === 0) {

    const document = await User.find({ 'userToken': req.params.userToken }).catch((e) => console.log(e));
    duplicatedVersion.qrUrl = updateQuery(document[0].url, "version", duplicatedVersion.tag)

    for (let refactoring of document[0].refactorings){
      if (refactoring.versions.includes(req.params.currentTag)) refactoring.versions.push(duplicatedVersion.tag)
    }
    document[0].versions.push(duplicatedVersion);
    await document[0].save().catch((err) => {
      console.log(err)
      disconnect()
      res.json({
        mensaje: err,
        success: false
      }).status(300).end()
    }).then(()=>{
      disconnect()
      res.json({
        mensaje: 'Versión duplicada con éxito',
        success: true
      }).status(200).end()
    });

  } else {

    disconnect();
    res.send({
      mensaje: 'El tag debe ser único',
      success: false
    }).status(300).end();

  }

})

//Update version for a user token and the version current tag, the new version data inside the request
app.put('/versions/:userToken/:currentTag', authenticateToken, cors(), async (req, res) => {

  const data = req.body;
  let modifiedVersion = new Version({
    name: data.name,
    description: data.description,
    qrUrl: "",
    tag: data.tag
  })
  console.log(modifiedVersion)

  connect()
  if (req.params.currentTag === modifiedVersion.tag){

    console.log("Tag is the same")
    await User.updateOne(
      { 'userToken': req.params.userToken, 'versions._id': data.id },
      { $set: { 
        "versions.$.name": modifiedVersion.name,
        "versions.$.description": modifiedVersion.description
      } }
    ).catch(e => console.error(e))

    disconnect()
    res.json({
      mensaje: "Version actualizada",
      success: true
    }).status(200).end()

  } else {

    console.log("Tag has changed")
    const foundVersionWithTag = await User.aggregate([
      { $match: { 'userToken': req.params.userToken } },
      { $unwind: "$versions" },
      { $replaceRoot: { newRoot: "$versions" } },
      { $match: { 'tag': modifiedVersion.tag } }
    ]).catch(e => console.error(e))

    if (Object.entries(foundVersionWithTag).length !== 0){

      disconnect()
      res.json({
        mensaje: "Error, no se pudo actualizar la version, el tag debe ser único",
        success: false
      }).status(300).end()

    } else {

      const document = await User.find({ 'userToken': req.params.userToken }).catch((e) => console.log(e));
      modifiedVersion.qrUrl = updateQuery(document[0].url, "version", modifiedVersion.tag)
  
      //This part should modify the tags for every refactoring which has the current tag
      for (let refactoring of document[0].refactorings){
        if (refactoring.versions.includes(req.params.currentTag)){
          refactoring.versions.pull(req.params.currentTag);
          refactoring.versions.push(modifiedVersion.tag);
        } 
      }
      await document[0].save()

      await User.updateOne(
        { 'userToken': req.params.userToken, 'versions._id': data.id },
        { $set: { "versions.$": modifiedVersion } }
      ).catch(e => console.error(e))

      disconnect()
      res.json({
        mensaje: 'Versión modificada con éxito',
        success: true
      }).status(200).end()

    }

  }

})


//Delete version for a user token and version tag
app.delete('/versions/:userToken/:versionTag', authenticateToken, cors(), async (req, res) => {

  connect()
  const document = await User.find({ 'userToken': req.params.userToken }).catch((e) => console.log(e));
  let versionRemove = document[0].versions.find(version => version.tag == req.params.versionTag);
  if(versionRemove){
    for (let refactoring of document[0].refactorings){
      if (refactoring.versions.includes(versionRemove.tag)){
        const index = refactoring.versions.indexOf(versionRemove.tag);
        if (index > -1) {
          refactoring.versions.splice(index, 1);
        }
      }
      if (refactoring.versions.length === 0){
        refactoring.refName = "toDelete";
      }
    }
    document[0].versions.pull(versionRemove);
    savedDocument = await document[0].save();

    await User.updateOne(
      { userToken: req.params.userToken },
      { $pull: { refactorings: { refName: "toDelete" } } },
      { multi: true }
    )

    disconnect()
    res.json({
      mensaje: "Version eliminada",
      success: true
    }).status(200).end()
  } else {
    disconnect()
    res.json({
      mensaje: "Error, no se pudo eliminar la version",
      success: false
    }).status(300).end()
  }

})







/*--- Refactorings routes ---*/
//Gets eval code to apply refactorings for a user token and version tag
app.get('/refactor/:userToken/:versionTag', cors(), async (req, res) => {
  //Request contains a user token
  const data = req.body;
  const refactorings = await getRefactorings(req.params.userToken, req.params.versionTag);

  //Forms string with code for eval function 
  var stream = '';
  INITIAL_FUNCTIONS.forEach(func => stream += func.toString());
  for (r of refactorings) {
    for (element of r.elements) stream += convertFunctionToString(FUNCTIONS_REFACTORING[r.refName][0], element, r.params != undefined ? r.params : '');
  }
  //console.log(stream);

  res.send(stream).status(200).end();
})

//Fetches all refactorings' names
app.get('/refactorings/all', cors(), (req, res) => {
  console.log(Object.keys(FUNCTIONS_REFACTORING));
  refactoringsName = Object.keys(FUNCTIONS_REFACTORING);
  descriptions = [];
  //let temp =  refDescription;
  refactoringsName.forEach((name) => {
    var des = {
      name,
      description: FUNCTIONS_REFACTORING[name][1].description
    }
    descriptions.push(des)
  });
  res.json({
    success: true,
    refactorings: refactoringsName,
    descriptions: descriptions
  })
})

//Gets all the refactorings for a user token
app.get('/refactorings/:userToken', authenticateToken, cors(), async (req, res) => {
  const refactorings = await getRefactorings(req.params.userToken);
  res.json({refactorings}).status(200).end();
})

//Gets all the refactorings for a user token and a version tag
app.get('/refactorings/:userToken/:versionTag', authenticateToken, cors(), async (req, res) => {
  const refactorings = await getRefactorings(req.params.userToken, req.params.versionTag);
  res.json({refactorings}).status(200).end();
})

//Creates a new refactoring, taking a user token by params and the refactoring in the request
app.post('/refactorings/:userToken', authenticateToken, cors(), async (req, res) => {
  //console.log(req.body)
  const data = req.body;

  let newRefactoring = new Refactoring({
    refName: data.refName,
    elements: data.elements,
    params: data.params,
    versions: data.versions
  }) 

  connect()
  User.findOneAndUpdate(
    { userToken: req.params.userToken },
    { $push: { refactorings: newRefactoring } },
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
          success: true
        }).status(200).end()
      }
    }
  )

})

//Update
app.put('/refactorings/update/:userToken', authenticateToken, cors(), async (req, res) => {

  const refactoring = req.body.refactoring;
  refactoring.elements = req.body.xpath;
  refactoring.params = req.body.parameters;

  connect()
  await User.updateOne(
    { 'userToken': req.params.userToken, 'refactorings._id': mongoose.Types.ObjectId(refactoring._id) },
    { $set: { 
      'refactorings.$.elements': refactoring.elements,
      'refactorings.$.params': refactoring.params
    }},{'new': true, 'safe': true, 'upsert': true}
  ).catch(e => console.error(e))
  disconnect()
  res.json({
      mensaje: "Refactoring actualizado con exito",
      success: true
    }).status(200).end()
  
})

//Delete one refactoring from all versions
app.put('/refactorings/delete/:userToken', authenticateToken, cors(), async (req, res) => {

  connect()
  const document = await User.find({ 'userToken': req.params.userToken }).catch((e) => console.log(e));
  let itemRemove = document[0].refactorings.find(refactoring => refactoring._id == req.body.id);
  if (itemRemove) {
    document[0].refactorings.pull(itemRemove);
    savedDocument = await document[0].save();
    disconnect()
    res.json({
      mensaje: "Refactoring eliminado",
      success: true
    }).status(200).end()
  } else {
    disconnect()
    res.json({
      mensaje: "Error, no se pudo eliminar el refactoring",
      success: false
    }).status(300).end()
  }

})

//Delete one refactoring from one version
app.put('/refactorings/delete/:userToken/:versionTag', authenticateToken, cors(), async (req, res) => {
 
  connect()
  const document = await User.find({ 'userToken': req.params.userToken }).catch((e) => console.log(e));
  let itemRemove = document[0].refactorings.find(refactoring => refactoring._id == req.body.id);
  if (itemRemove) {

    if (itemRemove.tags.length > 1){
      itemRemove.tags.pull(req.params.versionTag);
    } else {
      document[0].refactorings.pull(itemRemove);
    }

    savedDocument = await document[0].save();
    disconnect()
    res.json({
      mensaje: "Refactoring eliminado",
      success: true
    }).status(200).end()
  } else {
    disconnect()
    res.json({
      mensaje: "Error, no se pudo eliminar el refactoring",
      success: false
    }).status(300).end()
  }
  
})








/*---Utility---*/
function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1440s' });
}

function generateToken(length) {
  let rand = () => Math.random(0).toString(36).substr(2);
  return (rand() + rand() + rand() + rand()).substr(0, length)
}

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']

  if (token == null) return res.json({
    mensaje: "Error, no existe el token",
    success: false,
    status: 401
  }).status(401).end()

  jwt.verify(token, process.env.TOKEN_SECRET.toString(), (err, user) => {
    //console.log(err)
    if (err) return res.json({
      mensaje: "Error, no tiene permiso para esta seccion",
      success: false,
      status: 403
    }).status(403).end()
    req.user = user
    next()
  })
}

async function getRefactorings(userToken, versionTag) {
  connect();
  var refactorings;
  console.log(versionTag)

  if (!versionTag) {
    refactorings = await User.aggregate([
      { $match: { 'userToken': userToken } },
      { $unwind: "$refactorings" },
      { $replaceRoot: { newRoot: "$refactorings" } }
    ]).catch(e => {
      return console.error(e);
    });
  } else {
    refactorings = await User.aggregate([
      { $match: { 'userToken': userToken } },
      { $unwind: "$refactorings" },
      { $replaceRoot: { newRoot: "$refactorings" } },
      //no se si la siguiente linea funciona bien
      { $unwind: "$versions" },
      { $match: { 'versions': versionTag } }
    ]).catch(e => {
      return console.error(e);
    });
  }

  //disconnect();

  return refactorings;
}

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