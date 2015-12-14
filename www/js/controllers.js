angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});
	
	$scope.itemsMenu = [{
		title : 'Veículos', id : 1 }, {
		title : 'Restaurantes', id : 2
	}];
})

.controller('ListsCtrl', function($scope) {

	$scope.itemsMenu = [{
		title : 'Veículos', id : 1 }, {
		title : 'Restaurantes', id : 2
	}];
})

.controller('ListCtrl', function($scope, $stateParams) {
	
	$scope.list = {
		title: "Veículos",
		data: [{
			"title": "Ford",
			"id": 1
		}, {
			"title": "Fiat",
			"id": 2
		}]
	};

})

.controller('DetailsCtrl', function($scope, $stateParams) {
	
	$scope.details = {
		title: "Ford",
		data: [{
			"key": "Modelo",
			"value": "Ka"
		}, {
			"key": "Ano",
			"value": 2015
		}]
	};

});
