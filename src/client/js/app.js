'use strict';

angular
	.module('ngApp', [
		'ngApp.states',
		'ngApp.main',
		'ngApp.question.create',
		'ngApp.question.edit', 
		'ngApp.question.validate',
		'ngApp.contact',
		'ngAnimate'
	])
	.config(function($httpProvider) {
		// attach the interceptor to the http requests so the token is added on every call
		$httpProvider.interceptors.push('AuthInterceptor');
	});
