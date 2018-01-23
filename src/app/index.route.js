export function routerConfig ($stateProvider, $urlRouterProvider) {
	'ngInject';
	$stateProvider
		/*.state('home', {
			url: '/',
			templateUrl: 'app/main/main.html',
			controller: 'MainController',
			controllerAs: 'main'
		})*/
		.state('viewproduct', {
			url: '/product/:productid',
			templateUrl: 'app/components/viewproduct/viewproduct.html',
			controller: 'ViewProductController',
			controllerAs: 'vprodctrl'
		})		
		.state('spin2win', {
			url: '/?id&wechatID&prize&flag#/spin/123',			
			templateUrl: 'app/components/spinner/spinner.html',
			controller: 'SpinController',
			controllerAs: 'spinctrl'
		});
		/*
		.state('spin2win', {
			url: '/dist/?id&wechatID&prize&flag#/spin/123',
			templateUrl: 'app/components/spinner/spinner.html',
			controller: 'SpinController',
			controllerAs: 'spinctrl'
		});*/

	$urlRouterProvider.otherwise('/?id&wechatID&prize&flag#/spin/123');
}
