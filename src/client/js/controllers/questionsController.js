angular
	.module('ngApp.questions', ['ngApp.questionsService'])
	.controller('questionsController', function(Question) {
		var vm = this;
		Question.all()
			.success(function(data) {
				console.log(data)
			});		
	});