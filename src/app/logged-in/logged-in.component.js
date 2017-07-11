import {template} from './logged-in.tpl.html';

export let loggedInComponent = {
	selector: 'loggedInComponent',
	controllerAs: 'loggedInComponent',
	template,
	bindings: {
		newUser: '='
	},
	controller: class loggedInComponent {
		constructor($scope) {
			$scope.logout = () => {
				this.signOut();
			};

		}

		signOut() {
			firebase.auth().signOut().then(function() {
				alert('You have successfully logged out!');
			}).catch(function(error) {
				// An error happened.
				console.log(error);
			});
		}
	}
};