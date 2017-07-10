import {template} from './register.tpl.html';

export let registerComponent = {
	selector: 'registerComponent',
	controllerAs: 'registerComponent',
	template,
	bindings: {
		newUser: '='
	},
	controller: class registerComponent {
		constructor ($scope) {
			$scope.submit = () => {
				let newUser = $scope.newUser;
				if (newUser.password !== newUser.confirmPw) {
					alert("Passwords don't match");
				} else {
					this.createUser(newUser);
				}
			};
		}

		createUser(user) {
			console.log(user);
		}

	}
};