import {template} from './register.tpl.html';

export const registerComponent = {
	selector: 'registerComponent',
	controllerAs: 'registerComponent',
	template,
	bindings: {
		newUser: '='
	},
	controller: class registerComponent {
		constructor ($scope, emailRegEx) {
			$scope.submit = (event) => {
				event.preventDefault();
				let newUser = $scope.newUser;
				if (newUser.password !== newUser.confirmPw) {
					alert("Passwords don't match");
					return;
				} else {
					if (emailRegEx.test(newUser.email)) {
						this.createUser(newUser);
					} else {
						alert("Email is not valid");
						return;
					}
				}
			};
		}

		createUser(user) {
			firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {console.log(error)});
		}

	}
};