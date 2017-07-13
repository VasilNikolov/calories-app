import {template} from './logged-in.tpl.html';

export let loggedInComponent = {
	selector: 'loggedInComponent',
	controllerAs: 'loggedInComponent',
	template,
	controller: class loggedInComponent {
		constructor($scope, dataHandler) {
			let vm = this,
				user = firebase.auth().currentUser;

			if (user) {
				// User is signed in.
			} else {
				// No user is signed in.

			}

			$scope.logout = () => {
				this.signOut();
			};
			$scope.newMeal = (e) => {
				e.preventDefault();
				console.log('vliza');
				dataHandler.newMeal(vm.meal.description, vm.meal.calories);
			}

		}

		signOut() {
			firebase.auth().signOut().then(function() {
				alert('You have successfully logged out!');
			}).catch(function(error) {
				// An error happened.
				console.log(error);
			});
		};

	}
};