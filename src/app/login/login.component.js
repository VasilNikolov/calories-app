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
		constructor ($scope) {

			// Submit method for the login form
			$scope.submit = (event) => {
				event.preventDefault();
				let user = $scope.user,
					re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if (re.test(user.email)) {
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