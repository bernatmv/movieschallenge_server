import BaseRouter from '../router.base'
import FunFactsController from './game.controller';

const funfactsController = new FunFactsController();

class FunFactsRouter extends BaseRouter {

	addRoutes() {
		super.addRoutes();
		// add routes
		this.router.get('/funfacts', funfactsController.getAllFacts);
		this.router.get('/funfact/:factId', funfactsController.getFact);
		this.router.post('/funfact', funfactsController.createFact);
	}
}

export default new FunFactsRouter();