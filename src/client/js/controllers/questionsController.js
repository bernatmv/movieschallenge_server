'use strict';

angular
	.module('ngApp.question.create', ['ngApp.questionsService'])
	.controller('questionsController', function(Question, Auth) {
		var vm = this;
		// initializations
		vm.questionData = {
			category: 0,
			difficulty: 1
		};
		// methods
		vm.addQuestion = function() {
				vm.message = '';
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
				})
				.success(function(data) {
					vm.questionData = {};
					vm.message = data.message;
				})
				.error(function(data, status) {
					console.log(data, status);
					vm.message = 'Error';
				});
		}
	});
