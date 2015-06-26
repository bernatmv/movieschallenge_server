angular
	.module('ngApp', [
		'ngApp.states', 
		'ngApp.main', 
		'ngApp.questions', 
		'ngApp.contact', 
		'ngAnimate'
	])
	.config(function($httpProvider) {
		// attach the interceptor to the http requests so the token is added on every call
		$httpProvider.interceptors.push('AuthInterceptor');
	});