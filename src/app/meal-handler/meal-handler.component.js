import {template} from './meal-handler.tpl.html';

export let mealHandler = {
	selector: 'meals',
	controllerAs: 'vm',
	template: template,
	bindings: {
		data: '='
	},
	controller: class mealHandler {
		constructor($scope, dataHandler) {
			let vm = this;
			vm.$onInit = function () {
				dataHandler.readData().then(function (snapshot) {
					vm.data = snapshot;
					console.log(vm.data[0].calories);
				});
			};
		}
	}
};