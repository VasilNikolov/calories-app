import {template} from './login.tpl.html';

/**
 * Component responsible
 * @type {{restrict: string, selector: string, controllerAs: string, template: *, bindings: {user: string}, controller: loginController}}
 */
export let loginComponent = {
	restrict: 'E',
	selector: 'login',
	controllerAs: 'vm',
	template,
	bindings: {
		user: '='
	},
	controller: class loginController {
		constructor ($scope, emailRegEx) {
			let vm = this;
			// Submit method for the login form
			$scope.submit = (event) => {
				event.preventDefault();
				let user = vm.user;
				if (emailRegEx.test(user.email)) {
					this.loginUser(user);
				} else {
					alert('Email is not valid');
				}
			};

		}

		/**
		 * Method for logging in firebase user
		 * @param {Object} user - Object containing email and password
		 */
		loginUser(user) {
			firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch(function(error) {});
		}
	}
};