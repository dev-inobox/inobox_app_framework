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

.controller('ListCtrl', function($scope, $stateParams, $dataService, $location) {
	
	$scope.list = {};
	
	$dataService.get("entity/get/" + $stateParams.itemId, 
		function(data, responseCode) { //success
	        $scope.list = data;
	    }, 
	    function(data, responseCode) { //error
	    	console.log("Failed to load data"); 
	    }
    );
    
    $scope.url = $location.url();
    
    $scope.filterListable = function(element) {
		return element.ic_listavel == '1';
	};
})

.controller('DetailsCtrl', function($scope, $stateParams, $dataService) {
	
	$scope.details = {};
	
	$dataService.get("entity/details/" + $stateParams.entityId + "/" + $stateParams.itemId, 
		function(data, responseCode) { //success
	        $scope.details = data;
	    }, 
	    function(data, responseCode) { //error
	    	console.log("Failed to load data"); 
	    }
    );
    
    $scope.filterDetails = function(element) {
		return element.ic_detalhes == '1';
	};
});