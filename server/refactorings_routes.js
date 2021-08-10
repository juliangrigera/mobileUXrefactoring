module.exports = function(express){
	
	const refacsRouter = express.Router();

	const { convertFunctionToString } = require('../utils/functionsToString')
	const { FUNCTIONS_REFACTORING, INITIAL_FUNCTIONS } = require('../utils/refactoringsFunctions')
	const User = require('./User')
	const Refactoring = require('./Refactoring')

	//Gets eval code to apply refactorings for a user token
	refacsRouter.get('/refactor/:userToken', cors(), async (req, res) => {
		//Request contains a user token
		const data = req.body;
		const refactorings = await getRefactorings(req.params.userToken);

		//Forms string with code for eval function
		var stream = '';
		INITIAL_FUNCTIONS.forEach(func => stream += func.toString());
		for (r of refactorings) {
			for (element of r.elements) stream += convertFunctionToString(FUNCTIONS_REFACTORING[r.refName], element, r.params);
		}
		console.log(stream);

		res.send(stream).status(200).end();
	})

	//Fetches all refactorings' names
	refacsRouter.get('/all', cors(), (req, res) => {
		console.log(Object.keys(FUNCTIONS_REFACTORING));
		refactoringsName= Object.keys(FUNCTIONS_REFACTORING);
		res.json({
			success: true,
			refactorings: refactoringsName
		})
	})

	//Gets all the refactorings for a user token
	refacsRouter.get('/:userToken', authenticateToken, cors(), async (req, res) => {
		const refactorings = await getRefactorings(req.params.userToken);
		res.json(refactorings).status(200).end();
	})

	//Creates a new refactoring, taking a user token by params and the refactoring in the request
	refacsRouter.post('/:userToken', authenticateToken, cors(), async (req, res) => {
		
		const data = req.body;

		let newRefactoring = new Refactoring({
			refName: data.refName,
			elements: data.elements,
			params: data.paramsS
		})

		connect()
		await User.findOneAndUpdate(
			{ userToken: req.params.userToken },
			{ $push: { refactorings: newRefactoring.datos } },
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
	refacsRouter.post('/update/:userToken', authenticateToken, cors(), async (req, res) => {

		console.log(req.body);

	})

	//Delete one refactoring
	refacsRouter.post('/delete/:userToken', authenticateToken, cors(), async (req, res) => {

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


	/*---Utility---*/
	async function getRefactorings(userToken) {
		connect();
		const refactorings = await User.aggregate([
			{ $match: { 'userToken': userToken } },
			{ $unwind: "$refactorings" },
			{ $replaceRoot: { newRoot: "$refactorings" } }
		]).catch(e => {
			return console.error(e);
		});
		disconnect();

		return refactorings;
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

	return refacsRouter;
}