var app = angular.module('app.controllers', ['app.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {})

.controller('ListsCtrl', function($scope, $dataService) {

    $scope.itemsMenu = {};

    $dataService.get("entity", function(data, responseCode) {//success
        $scope.itemsMenu = data;
    }, function(data, responseCode) {//error
        console.log("Failed to load data");
    });
})
.controller('ListCtrl', function($scope, $stateParams, $dataService, $location) {

    $scope.list = {};

    $dataService.get("entity/get/" + $stateParams.itemId, function(data, responseCode) {//success
        $scope.list = data;
    }, function(data, responseCode) {//error
        console.log("Failed to load data");
    });

    $scope.url = $location.url();

    $scope.filterListable = function(element) {
        return element.ic_listavel == '1';
    };
})
.controller('DetailsCtrl', function($scope, $stateParams, $dataService) {

    $scope.details = {};

    $dataService.get("entity/details/" + $stateParams.entityId + "/" + $stateParams.itemId, function(data, responseCode) {//success
        $scope.details = data;
    }, function(data, responseCode) {//error
        console.log("Failed to load data");
    });

    $scope.filterDetails = function(element) {
        return element.ic_detalhes == '1';
    };
})
.controller('SearchCtrl', function($scope, $stateParams, $dataService, $sce) {

    var fields = '';
    
    $scope.searchItems = function(criteria) {
        console.log('criteria');
        console.log(criteria);
        console.log($scope.criteria);
    };
    
    $scope.criteria = {};

    $dataService.get("entity/search/" + $stateParams.entityId, function(data, responseCode) {//success
        angular.forEach(data, function(value, key) {
            
            name    = 'name="'+value.ds_nome_tecnico+'"';
            ngModel = 'ng-model="criteria.'+value.ds_nome_tecnico+'"';
            
            if (value.ds_tipo == 'texto simples') {
                fields += '<label class="item item-input"> <input type="text" '+name+' '+ngModel+' placeholder="'+value.ds_label+'"> </label>';
            }
            
            if (value.ds_tipo == 'selecao unica') {
                opt = value.ds_valor.split(",");
                options = '';
                angular.forEach(opt, function (value, key) {
                    options += '<option value="'+value+'">'+value+'</option>';
                });
                fields += '<label class="item item-input item-select"> \
                                    <div class="input-label"> \
                                        '+value.ds_label+' \
                                    </div> \
                                    <select '+name+' '+ngModel+' > '+ options +' </select> \
                                </label>';
            }
            
            if (value.ds_tipo == 'selecao multipla') {
                opt = value.ds_valor.split(",");
                options = '';
                angular.forEach(opt, function (value, key) {
                    options += '<option value="'+value+'">'+value+'</option>';
                });
                fields += '<label class="item item-input item-select"> \
                                    <div class="input-label"> \
                                        '+value.ds_label+' \
                                    </div> \
                                    <select multiple="true" '+name+' '+ngModel+' > '+ options +' </select> \
                                </label>';
            }
        });
        
        $scope.fields = $sce.trustAsHtml(fields);
        
    }, function(data, responseCode) {//error
        console.log("Failed to load data");
    });
}); 

app.directive('compile', function($compile, $timeout) {
    return {
        restrict : 'A',
        link : function(scope, elem, attrs) {
            $timeout(function() {

                $compile(elem.contents())(scope);
            });
        }
    };
}); 
