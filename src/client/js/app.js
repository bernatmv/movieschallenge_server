angular
	.module('movieschallenge', [])
	.controller('mainController', function() {
		// bind "this" to "vm" (view-model)
		var vm = this;
		// all variables defined on thi will be available on the view
		vm.message = 'Yo!';
		vm.facts = [
			{ name: 'fuck', color: 'yellow', time: 10 },
			{ name: 'sleep', color: 'green', time: 1000 },
			{ name: 'eat', color: 'red', time: 20 },
		];
	});