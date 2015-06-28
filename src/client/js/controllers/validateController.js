angular
	.module('ngApp.question.validate', ['ngApp.questionsService'])
	.controller('validateController', function(Question) {
		var vm = this;
		vm.questions = [];
		Question.all()
			.success(function(data) {
				vm.questions = data;
			});		
	});