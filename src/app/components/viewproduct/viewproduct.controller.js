/* globals moment */

export class ViewProductController {
	constructor ($stateParams, $scope, ProductDataService) {
		'ngInject';

		let productId = $stateParams.productid;
		$scope.products = ProductDataService.getProduct(productId);

		angular.forEach($scope.products, (item) => {
			item.startTime = moment(item.startTime).unix();
		});
	}
}
