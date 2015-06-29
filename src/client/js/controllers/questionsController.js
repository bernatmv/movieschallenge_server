angular
	.module('ngApp.question.create', ['ngApp.questionsService'])
	.controller('questionsController', function(Question) {
		var vm = this;
		// initializations
		vm.questionData = {
			category: 0,
			difficulty: 1
		};
		// methods
		vm.addQuestion = function() {
				Question.create({
					category: vm.questionData.category,
					difficulty: vm.questionData.difficulty,
					quote: vm.questionData.quote,
					correctAnswer: vm.questionData.correctAnswer,
					otherAnswers: [
						vm.questionData.otherAnswer1,
						vm.questionData.otherAnswer2,
						vm.questionData.otherAnswer3,
						vm.questionData.otherAnswer4,
						vm.questionData.otherAnswer5
					]
				});
		}
	});
