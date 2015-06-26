'use strict';

angular
	.module('ngApp.main', ['ngApp.authService'])
	.controller('mainController', function($rootScope, $location, Auth) {
		// bind "this" to "vm" (view-model)
		var vm = this;
		vm.loginData = {};
		// check if the user is logged in
		vm.loggedIn = Auth.isLoggedIn();
		// get user info on route change
		$rootScope
			.$on('$stateChangeStart', function() {
				vm.loggedIn = Auth.isLoggedIn();
				Auth.getUser()
					.then(function(response) {
						vm.user = response.data;
					});
		});
		// login handler
		vm.doLogin = function() {
			// loading spinner
			vm.processingLogin = true;
			// clear error
			vm.error = '';
			// do login
			Auth.login(vm.loginData.username, vm.loginData.password)
				.success(function(data) {					
					// clear spinner
					vm.processingLogin = false;
					// if login successful, redirect to questions, if not show an error
					if (data.success) {
						$location.path('/questions');
					}
					else {
						vm.error = data.message;
					}
				});
		}
		// lohout handler
		vm.doLogout = function() {
			Auth.logout();
			vm.user = {};
			$location.path('/');
		}
	});