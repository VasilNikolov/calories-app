import {template} from './login.tpl.html';

export let loginComponent = {
	restrict: 'E',
	selector: 'login',
	controllerAs: 'vm',
	template,
	bindings: {
		user: '='
	},
	controller: class loginController {
		constructor ($scope) {
			$scope.submit = () => {
				let user = $scope.user,
					re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if (re.test(user.email)) {
					this.loginUser(user);
				} else {
					alert('Email is not valid');
				}
			};
		}

		loginUser(user) {
			console.log(user);
		}
	}
};