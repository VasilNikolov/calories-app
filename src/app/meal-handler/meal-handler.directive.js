import template from './meal-handler.tpl.html';

export function mealHandler(dataHandler) {

	function linkFn(scope, el, attrs) {
		dataHandler.readData().then(function (snapshot) {
			scope.data = snapshot;
			console.log(scope.data);
		});
	}
	let directive = {
		restrict: 'E',
		scope: {
		},
		template: template,
		link: linkFn
	};

	return directive;
}