import angular from 'angular';
import ngRoute from 'angular-route';
import ngPassword from 'angular-password';
import {loginComponent} from './login/login.component';
import {registerComponent} from './register/register.component';
import {passwordVerify} from './verify/verify.directive';


export default angular.module('app', ['ngRoute', 'ngPassword'])
	.config(config)
	.component(loginComponent.selector, loginComponent)
	.component(registerComponent.selector, registerComponent)
	.directive('passwordVerify', passwordVerify);


function config($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: '/src/app/login/login.tpl.html',
		controller: loginComponent.controller,
		controllerAs: 'vm'
	}).when('/register', {
		templateUrl: '/src/app/register/register.tpl.html',
		controller: registerComponent.controller,
		controllerAs: 'vm'
	}).otherwise({
		redirectTo: '/'
	});
}