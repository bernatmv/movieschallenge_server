angular
	.module('ngApp', ['ngApp.states'])
	.controller('mainController', function() {
		// bind "this" to "vm" (view-model)
		var vm = this;
		// all variables defined on "this" will be available on the view
		vm.message = 'main';
	})
	.controller('questionsController', function() {
		var vm = this;
		vm.message = 'questions';
	})
	.controller('contactController', function() {
		var vm = this;
		vm.message = 'contact';
	});