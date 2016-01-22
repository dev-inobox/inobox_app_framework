/*
 credits: Soluction found in http://snippetrepo.com/snippets/angularjs-http-rest-service-abstraction
 * */

angular.module('app.services', [])

.service("$dataService", ["$http",
	function($http) {
		var baseLocal 	= "http://api-app-inobox";
		var baseRemote 	= "http://www.w3schools.com";
		var baseURL 	= baseLocal;
		
		return {
			get : function(datatype, onSuccess, onError) {
				var url = baseURL + "/" + datatype;
				$http.get(url).success(onSuccess).error(onError);
			},
	
			post : function(datatype, data, onSuccess, onError) {
				var url = baseURL + "/" + datatype;
				$http.post(url, data).success(onSuccess).error(onError);
			},
	
			put : function(datatype, data, onSuccess, onError) {
				var url = baseURL + "/" + datatype;
				$http.put(url, data).success(onSuccess).error(onError);
			},
	
			delete : function(datatype, id, onSuccess, onError) {
				var url = baseURL + "/" + datatype + "/" + id;
				$http.delete(url, id).success(onSuccess).error(onError);
			}
		}
	}
]);
