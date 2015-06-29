angular
	.module('ngApp.question.validate', ['ngApp.questionsService'])
	.controller('validateController', function(Question) {
		var vm = this;
		vm.questions = [];
		vm.processing = true;
		// show all pending questions
		Question.allPending()
			.success(function(data) {
				vm.processing = false;
				vm.questions = data;
			});
	});
