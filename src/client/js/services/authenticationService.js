angular.module('ngApp.authenticationService', [])
	.factory('Authenticate', function($http) {
		// create factory
		var factory = {};

		// authenticate the user and get the token
		factory.login = function() {
			return $http.post('/api/authenticate', { username: 'berni', password: 'hanabi' });
		}
		
		// return the factory
		return factory;
	});