export let passwordVerify = () => {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function (scope, elem, attrs, ngModel) {
			console.log('vliza');
			ngModel.$validators.myPwdInvalid = function (modelValue, viewValue) {
				return viewValue === scope.$eval(attrs.passwordVerify);
			};
		}
	}
};