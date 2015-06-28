angular.module('ngApp.states', ['ui.router'])
	// configure the routes
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		// unmatched urls
		$urlRouterProvider.otherwise("/");
		// set up the states
		$stateProvider
			// main
			.state('home', {
				url: '/',
				templateUrl: 'views/pages/main.html',
				controller: 'mainController',
				controllerAs: 'main',
			})
			// questions
			.state('questionCreate', {
				url: '/questions',
				templateUrl: 'views/pages/questions.html',
				controller: 'questionsController',
				controllerAs: 'question',
			})
			.state('questionValidate', {
				url: '/validate',
				templateUrl: 'views/pages/validate.html',
				controller: 'validateController',
				controllerAs: 'validate',
			})
			// contact
			.state('contact', {
				url: '/contact',
				templateUrl: 'views/pages/contact.html',
				controller: 'contactController',
				controllerAs: 'contact',
			});

	}]);