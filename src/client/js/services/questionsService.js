angular.module('ngApp.questionsService', [])
	.factory('Question', function($http) {
		return {
			get: function(questionId) {
				return $http.get('/api/question/' + questionId, { cache: true });
			},
			create: function(question) {
				return $http.post('/api/question', question);
			},
			all: function() {
				return $http.get('/api/questions');
			},
			allPending: function() {
				return $http.get('/api/questionsPending');
			}
		};
	});
