'use strict';

angular
	.module('ngApp.main', ['ngApp.authService'])
	.controller('mainController', function($rootScope, $location, Auth) {
		// bind "this" to "vm" (view-model)
		var vm = this;
		// check if the user is logged in
		vm.loggedIn = Auth.isLoggedIn();
		// get user info on route change
		$rootScope.$on('$routeChangeStart', function() {
			vm.loggedIn = Auth.isLoggedIn();
			Auth.getUser()
				.success(function(data) {
					vm.user = data;
				});
		});
		// login handler
		vm.doLogin = function() {
			Auth.login(vm.loginData.username, vm.loginData.password)
				.success(function(data) {
					$location.path('/questions');
				});
		}
		// lohout handler
		vm.doLogout = function() {
			Auth.logout();
			vm.user = {};
			$location.path('/home');
		}
	});