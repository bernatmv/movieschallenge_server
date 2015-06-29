'use strict';

angular.module('ngApp.questionsService', [])
	.factory('Question', function($http) {
		return {
			get: function(questionId) {
				return $http.get('/api/question/' + questionId);
			},
			create: function(question) {
				return $http.post('/api/question', question);
			},
			delete: function(questionId) {
				return $http.delete('/api/question/' + questionId);
			},
			all: function() {
				return $http.get('/api/questions');
			},
			allPending: function() {
				return $http.get('/api/questionsPending');
			}
		};
	});
