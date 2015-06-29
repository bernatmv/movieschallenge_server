'use strict';

angular.module('ngApp.authService', [])
	.factory('AuthToken', function($window) {
		return {
			getToken: function() {
				return $window.localStorage.getItem('token');
			},
			setToken: function(token) {
				if (token) {
					$window.localStorage.setItem('token', token);
				}
				else {
					$window.localStorage.removeItem('token');
				}
			}
		};
	})
	.factory('Auth', function($http, $q, AuthToken) {
		return {
			login: function(username, password) {
				// get the token and save it
				return $http.post('/api/authenticate', {
						username: username,
						password: password
					})
					.success(function(data) {
						AuthToken.setToken(data.token);
						return data;
					});
			},
			logout: function() {
				// clear the token
				AuthToken.setToken();
			},
			isLoggedIn: function() {
				return (AuthToken.getToken()) ? true : false;
			},
			getUser: function() {
				return (AuthToken.getToken()) ? $http.get('/api/me', { cache: true }) : $q.reject({ message: 'No token available' });
			}
		};
	})
	.factory('AuthInterceptor', function($q, $location, AuthToken) {
		return {
			request: function(config) {
				var token = AuthToken.getToken();
				// if the token exists, add it to the headers
				if (token) {
					config.headers['x-access-token'] = token;
				}
				return config;
			},
			responseError: function(response) {
				if (response.status === 403) {
					AuthToken.setToken();
					$location.path('/');
				}
				return $q.reject(response);
			}
		};
	});
