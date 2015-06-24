// inject ngRoute
angular.module('movieschallengeRoutes', ['ngRoute'])
	// configure the routes
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			// main
			.when('/', {
				templateUrl: 'views/pages/main.html',
				controller: 'mainController',
				controllerAs: 'main',
			})
			// questions
			.when('/questions', {
				templateUrl: 'views/pages/questions.html',
				controller: 'questionsController',
				controllerAs: 'questions',
			})
			// contact
			.when('/contact', {
				templateUrl: 'views/pages/contact.html',
				controller: 'contactController',
				controllerAs: 'contact',
			});
		// set up pretty URLs
		$locationProvider.html5Mode(true);
	});