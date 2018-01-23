/* globals moment */

export class MainController {
	constructor ($scope, ProductDataService) {
		'ngInject';
		$scope.thirdexpanded = false;
		$scope.firstexpanded = false;

		$scope.products = ProductDataService.getProduct();

		angular.forEach($scope.products, (item) => {
			item.startTime = moment(item.startTime).valueOf();
		});
	}
}
