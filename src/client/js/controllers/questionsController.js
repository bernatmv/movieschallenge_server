'use strict';

angular
	.module('ngApp.question.create', ['ngApp.questionsService'])
	.controller('questionsController', function(Question) {
		var vm = this;
		// methods
		vm.addQuestion = function() {
				vm.message = '';
				Question.create({
					category: vm.questionData.category,
					difficulty: vm.questionData.difficulty,
					quote: vm.questionData.quote,
					correctAnswer: vm.questionData.correctAnswer,
					otherAnswers: vm.questionData.otherAnswers
				})
				.success(function(data) {
					vm.resetQuestion();
					vm.message = data.message;
				})
				.error(function(data, status) {
					console.log(data, status);
					vm.message = 'Error';
				});
		}
		vm.resetQuestion = function() {
			vm.questionData = {
				category: 0,
				difficulty: 1,
				otherAnswers: ['','','','','']
			};
		}
		// initializations
		vm.resetQuestion();
	});
