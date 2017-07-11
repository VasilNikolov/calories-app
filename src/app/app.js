import angular from 'angular';
import ngRoute from 'angular-route';
import ngPassword from 'angular-password';
import {loginComponent} from './login/login.component';
import {registerComponent} from './register/register.component';
import {loggedInComponent} from './logged-in/logged-in.component';


export default angular.module('app', ['ngRoute', 'ngPassword'])
	.config(config)
	.component(loginComponent.selector, loginComponent)
	.component(registerComponent.selector, registerComponent)
	.component(loggedInComponent.selector, loggedInComponent).run( function($location, $window, $rootScope) {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user !== null) {
				//User is logged in
				let uid = user.uid;
				firebase.database().ref('/users/' + uid).once('value').then(function (snapshot) {
					let obj = snapshot.val();
					try {
						let access = obj.access;
						switch (access) {
							case 'admin':
								console.log('admin');
								break;
							case 'manager':
								alert('You are a manager!');
								break;
							default:
								$rootScope.$apply(function () {
									$location.path("/logged-in");
								});
								break;
						}
					} catch (e) {
						console.log(e);
					}
				});
			} else {
				//listener to watch route changes
				$rootScope.$on("$routeChangeStart", function (event, next, current) {
					if (firebase.auth().currentUser === null) {
						// no logged user, we should be going to #login
						if (next.templateUrl === "/src/app/login/login.tpl.html" || next.templateUrl === "/src/app/register/register.tpl.html") {
							// already going to login, no redirect needed
						} else {
							// not going to login, we should redirect now
							$location.path("/login");
						}
					}
				});
			}

		});

	});

function config($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: '/src/app/login/login.tpl.html',
		controller: loginComponent.controller,
		controllerAs: 'vm',
		reloadOnSearch: false
	}).when('/register', {
		templateUrl: '/src/app/register/register.tpl.html',
		controller: registerComponent.controller,
		controllerAs: 'vm',
		reloadOnSearch: false
	}).when('/logged-in', {
		templateUrl: '/src/app/logged-in/logged-in.tpl.html',
		controller: loggedInComponent.controller,
		controllerAs: 'vm',
		reloadOnSearch: false
	}).otherwise({
		redirectTo: '/'
	});
}