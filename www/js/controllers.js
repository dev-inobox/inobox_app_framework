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

.controller('SearchCtrl', function($scope, $stateParams, $dataService, $sce, $utils) {
    
    $scope.list = {};
    $scope.formShow  = true;
    $scope.foundShow = false;
    
    $scope.callSearch = function() {
        $scope.list = {};
        
        $scope.formShow  = true;
        $scope.foundShow = false;
        $scope.$apply();
    };
    
    $scope.searchItems = function(criteria) {
        var params = $utils.obj2QueryString(criteria);
        
        $dataService.post("entity/found/" + $stateParams.entityId, params, function(data, responseCode) {//success
            console.log(data);
            $scope.list = data;
            $scope.foundShow = true;
            $scope.formShow  = false;
            $scope.$apply();
            
        }, function(data, responseCode) {//error
            console.log("Failed to load data");
        });
    };
    
    $scope.fields = [];
    $scope.criteria = {};
    
    $dataService.get("entity/search/" + $stateParams.entityId, function(data, responseCode) {//success
        angular.forEach(data, function(value, key) {
            
            field   = '';
            name    = 'name="'+value.ds_nome_tecnico+'"';
            ngModel = 'ng-model="criteria.'+value.ds_nome_tecnico+'"';
            
            if (value.ds_tipo.match(/texto/g)) {
                field = '<label class="item item-input"> \
                            <span class="input-label">'+value.ds_label+'</span> \
                            <input type="text" '+name+' '+ngModel+' placeholder="'+value.ds_label+'"> </label>';
            }
            
            if (value.ds_tipo == 'data') {
                field = '<label class="item item-input"> \
                            <span class="input-label">'+value.ds_label+'</span> \
                            <input type="date" '+name+' '+ngModel+'> </label>';
            }
            
            if (value.ds_tipo.match(/decimal|inteiro|moeda/g)) {
                field = '<label class="item item-input"> \
                            <span class="input-label">'+value.ds_label+'</span> \
                            <input type="number" '+name+' '+ngModel+'> </label>';
            }
            
            if (value.ds_tipo == 'selecao unica') {
                opt = value.ds_valor.split(",");
                options = '';
                angular.forEach(opt, function (value, key) {
                    options += '<option value="'+value+'">'+value+'</option>';
                });
                field = '<label class="item item-input item-select"> \
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
                    // options += '<ion-option>'+value+'</ion-option>';
                });
                field = '<label class="item item-input item-select"> \
                                    <div class="input-label"> \
                                        '+value.ds_label+' \
                                    </div> \
                                    <select multiple="true" '+name+' '+ngModel+' > '+ options +' </select> \
                                </label>';
                
                /* field = '<ion-item> \
                            <ion-label>'+value.ds_label+'</ion-label> \
                            <ion-select [(ngModel)]="'+value.ds_nome_tecnico+'" multiple="true"> '+ options +' </ion-select> \
                         </ion-item>'; */
            }
            
            this.push($sce.trustAsHtml(field));
        }, $scope.fields);
        
    }, function(data, responseCode) {//error
        console.log("Failed to load data");
    });
});

app.directive('compile',function($compile, $timeout){
    return{
        restrict:'A',
        link: function(scope,elem,attrs){
            $timeout(function(){                
                $compile(elem.contents())(scope);    
            });
        }        
    };
});