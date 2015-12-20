angular.module('app.controllers', ['app.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {})

.controller('ListsCtrl', function($scope, $dataService) {
	
	$scope.itemsMenu = {};
	
	$dataService.get("entity", 
		function(data, responseCode) { //success
	        $scope.itemsMenu = data;
	    }, 
	    function(data, responseCode) { //error
	    	console.log("Failed to load data"); 
	    }
    );
})

.controller('ListCtrl', function($scope, $stateParams, $dataService) {
	
	$scope.list = {};
	
	$dataService.get("entity/get/" + $stateParams.itemId, 
		function(data, responseCode) { //success
	        $scope.list = data;
	    }, 
	    function(data, responseCode) { //error
	    	console.log("Failed to load data"); 
	    }
    );
})

.controller('DetailsCtrl', function($scope, $stateParams, $dataService) {
	
	$scope.details = {};
	
	$dataService.get("entity/details/" + $stateParams.itemId, 
		function(data, responseCode) { //success
	        $scope.details = data;
	    }, 
	    function(data, responseCode) { //error
	    	console.log("Failed to load data"); 
	    }
    );
});