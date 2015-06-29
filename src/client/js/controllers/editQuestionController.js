'use strict';

angular
	.module('ngApp.question.edit', ['ngApp.questionsService'])
	.controller('editQuestionController', function($stateParams, $location, Question) {
		var vm = this;
        vm.questionId = $stateParams.questionId;
        vm.questionData = {};
		// initializations
        Question.get($stateParams.questionId)
            .success(function(data) {
                vm.questionData = data;
            })
            .error(function(data, status) {
                console.log(data, status);
                vm.questionData = {};
                vm.message = 'An error ocurred retrieving the question';
            });
        // methods
        vm.editQuestion = function() {
            vm.call(vm.questionData);
            $location.path('/validate');
        }
        vm.validateQuestion = function() {
            vm.questionData.approved = 1;
            vm.call(vm.questionData);
            $location.path('/validate');
        }
        vm.deleteQuestion = function() {
            Question.delete(vm.questionId);
            $location.path('/validate');
        }
        vm.call = function(data) {
				vm.message = '';
				Question.create(data)
				.success(function(data) {
					vm.message = data.message;
				})
				.error(function(data, status) {
					console.log(data, status);
					vm.message = 'Error';
				});
		};
	});
