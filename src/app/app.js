/**
 * Import our files
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngPassword from 'angular-password';
import {userAccess} from './user-access/user-access';
import {loginComponent} from './login/login.component';
import {registerComponent} from './register/register.component';
import {loggedInComponent} from './logged-in/logged-in.component';
import {mealHandler} from './meal-handler/meal-handler.component';
import {dataHandler} from './services/data-handler/data-handler.service';
import constants from './constants/constants.module';
/**
 * Import templates
 */
// import {loginTpl} from './login/login.tpl.html';
// import {registerTpl} from './register/register.tpl.html';
// import {loggedInTpl} from './logged-in/logged-in.tpl.html';

/**
 * Start our angular module named 'app'
 * Dependencies are:
 *  - ngRoute
 *  - ngPassword
 *  - constants
 */
const appDeps = [uiRouter, 'ngPassword', constants.name];

export default angular.module('app', appDeps)
	.config(config)
	.run(userAccess)
	.service('dataHandler', dataHandler)
	.component(mealHandler.selector, mealHandler)
	.component(loginComponent.selector, loginComponent)
	.component(registerComponent.selector, registerComponent)
	.component(loggedInComponent.selector, loggedInComponent);



/**
 * The configuration of our app, handles the routing
 * @param $stateProvider - The route provider from ngRoute
 * @param $logProvider - The log provider angular object
 */
function config($stateProvider, $logProvider) {
	$logProvider.debugEnabled(true);

	$stateProvider
		.state('login', {
			url: '/',
			templateUrl: 'src/app/login/login.tpl.html',
			controller: loginComponent.controller,
			controllerAs: 'vm'
		})
		.state('register', {
			url: '/register',
			templateUrl: 'src/app/register/register.tpl.html',
			controller: registerComponent.controller,
			controllerAs: 'vm'
		})
		.state('logged-in', {
			abstract: true,
			url: '/logged-in',
			templateUrl: 'src/app/logged-in/logged-in.tpl.html',
			controller: loggedInComponent.controller,
			controllerAs: 'vm'
		}).state('logged-in.meals', {
			url: '',
			templateUrl: 'src/app/meal-handler/meal-handler.tpl.html',
			controller: mealHandler.controller,
			controllerAs: 'vm'
		});
}
// function config($routeProvider, $logProvider) {
// 	$logProvider.debugEnabled(true);
//
// 	$routeProvider
// 		.when('/', {
// 			templateUrl: loginComponent.template,
// 			controller: loginComponent.controller,
// 			controllerAs: 'vm',
// 			reloadOnSearch: false
// 		})
// 		.when('/register', {
// 			templateUrl: registerTpl,
// 			controller: registerComponent.controller,
// 			controllerAs: 'vm',
// 			reloadOnSearch: false
// 		})
// 		.when('/logged-in', {
// 			templateUrl: loggedInTpl,
// 			controller: loggedInComponent.controller,
// 			controllerAs: 'vm',
// 			reloadOnSearch: false
// 		})
// 		.otherwise({
// 			redirectTo: '/'
// 		});
// }