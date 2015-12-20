angular.module('app.services', [])

.service("$dataService", ["$http",
	function($http) {
		var baseLocal 	= "http://api-app-inobox";
		var baseRemote 	= "http://www.w3schools.com";
		var baseURL 	= baseLocal;
		
		return {
			get : function(datatype, onSuccess, onError) {
				var url = baseURL + "/" + datatype;
				//console.log("GET: " + url);
				$http.get(url).success(onSuccess).error(onError);
			},
	
			post : function(datatype, data, onSuccess, onError) {
				var url = baseURL + "/" + datatype;
				//console.log("POST: " + url);
				$http.post(url, data).success(onSuccess).error(onError);
			},
	
			put : function(datatype, data, onSuccess, onError) {
				var url = baseURL + "/" + datatype;
				//console.log("PUT: " + url);
				$http.put(url, data).success(onSuccess).error(onError);
			},
	
			delete : function(datatype, id, onSuccess, onError) {
				var url = baseURL + "/" + datatype + "/" + id;
				//console.log("DELETE: " + url);
				$http.delete(url, id).success(onSuccess).error(onError);
			}
		}
	}
]);
