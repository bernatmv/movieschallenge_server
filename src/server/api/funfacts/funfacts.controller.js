import FunFactModel from './funfacts.model';

class FunFactsController {

	createFact(req, res) {
		// create model and fill data
		var fact = FunFactsController.__fillModel(req);
		// save to db
		fact.save((err, reg) => { 
			(err) ?	res.send(err) : res.json({ success: true, id: reg._id });
		});
	}

	getAllFacts(req, res) {
		FunFactModel.find((err, facts) => {
			(err) ? res.send(err) : res.json(facts);
		});
	}
 
 	getFact(req, res) {
		FunFactModel.findById(req.params.factId, (err, fact) => {
			(err) ? res.send(err) : res.json(fact);
		});
	}

	static __fillModel(req) {
		var fact = new FunFactModel();
		fact.text = req.body.text;
		fact.source = req.body.source;
		return fact;
	}
}

export default FunFactsController;