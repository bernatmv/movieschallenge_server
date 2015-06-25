angular
	.module('ngApp.main', ['ngApp.authenticationService'])
	.controller('mainController', function(Authenticate) {
		// bind "this" to "vm" (view-model)
		var vm = this;
		// access the API
		Authenticate
			.login()
			.then(function(response) {
				vm.message = response.data.token;
			});
	});