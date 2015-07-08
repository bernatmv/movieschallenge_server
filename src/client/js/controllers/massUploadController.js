'use strict';

angular
	.module('ngApp.question.massUpload', ['ngApp.questionsService'])
	.controller('massUploadController', function(Question) {
		var vm = this;
		vm.questions = [];
		vm.questionsData = '';
		// show all pending questions
		vm.massLoad = function() {
			// string clean-up
			vm.questionsData = vm.questionsData.replace(/(\"\{)/g, '{');
			vm.questionsData = vm.questionsData.replace(/(\}\,\")/g, '},');
			vm.questionsData = vm.questionsData.replace(/(?:\r\n|\r|\n)/g, '\\n');
			vm.questionsData = vm.questionsData.replace(/(\}\,\\n)/g, '},');
			// process JSON
			vm.questions = eval(vm.questionsData);
		};
		vm.massProcess = function() {
			vm.questions.map(function(question) {
				Question.create({
					category: question.category,
					difficulty: question.difficulty,
					quote: question.quote,
					correctAnswer: question.correctAnswer,
					otherAnswers: question.otherAnswers
				})
				.success(function(data) {
					question.status = 1;
					console.log(data.message);
				})
				.error(function(data, status) {
					console.log(data, status);
				});
			});
		};
	});
