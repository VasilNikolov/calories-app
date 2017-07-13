/**
 * Import our files
 */
import angular from 'angular';
import ngRoute from 'angular-route';
import ngPassword from 'angular-password';
import {userAccess} from './user-state/user-state';
import {loginComponent} from './login/login.component';
import {registerComponent} from './register/register.component';
import {loggedInComponent} from './logged-in/logged-in.component';
import {mealHandler} from './meal-handler/meal-handler.directive';
import {dataHandler} from './services/data-handler/data-handler.service';

/**
 * Start our angular module named 'app'
 * Dependencies are:
 *  - ngRoute
 *  - ngPassword
 */
export default angular.module('app', ['ngRoute', 'ngPassword'])
	.config(config)
	.run(userAccess)
	.service('dataHandler', dataHandler)
	.component(loginComponent.selector, loginComponent)
	.component(registerComponent.selector, registerComponent)
	.component(loggedInComponent.selector, loggedInComponent)
	.directive('meals', mealHandler);


/**
 * The configuration of our app, handles the routing
 * @param $routeProvider - The route provider from ngRoute
 * @param $logProvider - The log provider angular object
 */
function config($routeProvider, $logProvider) {
	$logProvider.debugEnabled(true);
	$routeProvider
		.when('/', {
			templateUrl: '/src/app/login/login.tpl.html',
			controller: loginComponent.controller,
			controllerAs: 'vm',
			reloadOnSearch: false
		})
		.when('/register', {
			templateUrl: '/src/app/register/register.tpl.html',
			controller: registerComponent.controller,
			controllerAs: 'vm',
			reloadOnSearch: false
		})
		.when('/logged-in', {
			templateUrl: '/src/app/logged-in/logged-in.tpl.html',
			controller: loggedInComponent.controller,
			controllerAs: 'vm',
			reloadOnSearch: false
		})
		.otherwise({
			redirectTo: '/'
		});
}