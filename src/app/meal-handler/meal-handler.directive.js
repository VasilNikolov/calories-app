import template from './meal-handler.tpl.html';

export function mealHandler(dataHandler) {

	function controllerFn($scope) {
		dataHandler.readData().then(function (snapshot) {
			$scope.data = snapshot;
			console.log($scope.data);
		});
	}
	let directive = {
		restrict: 'E',
		scope: {
			data: '='
		},
		template: template,
		controller: controllerFn,
		controllerAs: 'vm'
	};

	return directive;
}