angular.module('ngApp.questionsService', [])
	.factory('Question', function($http) {
		return {
			get: function(questionId) {
				return $http.get('/api/question/' + questionId, { cache: true });
			},
			all: function(token) {
				return $http.get('/api/questions');
			}
		};
	});
