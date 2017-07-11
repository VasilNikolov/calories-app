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
			$scope.submit = (event) => {
				event.preventDefault();
				let newUser = $scope.newUser,
					re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if (newUser.password !== newUser.confirmPw) {
					alert("Passwords don't match");
					return;
				} else {
					if (re.test(newUser.email)) {
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