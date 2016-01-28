/*
 credits: Soluction found in http://snippetrepo.com/snippets/angularjs-http-rest-service-abstraction
 * */

angular.module('app.services', [])

.service("$dataService", ["$http",
	function($http) {
		var baseLocal 	= "http://api-app-inobox";
		var baseRemote 	= "http://www.w3schools.com";
		var baseURL 	= baseLocal;
		var options     = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
		
		return {
			get : function(datatype, onSuccess, onError) {
				var url = baseURL + "/" + datatype;
				$http.get(url).success(onSuccess).error(onError);
			},
			
			post : function(datatype, data, onSuccess, onError) {
				var url = baseURL + "/" + datatype;
				$http.post(url, data, options).success(onSuccess).error(onError);
			},
	
			put : function(datatype, data, onSuccess, onError) {
				var url = baseURL + "/" + datatype;
				$http.put(url, data, options).success(onSuccess).error(onError);
			},
	
			delete : function(datatype, id, onSuccess, onError) {
				var url = baseURL + "/" + datatype + "/" + id;
				$http.delete(url, id, options).success(onSuccess).error(onError);
			}
		};
	}
])

/* Converts an object into a key/value par with an optional prefix. Used for converting objects to a query string */
/* Solution found in https://gist.github.com/jaf0/e919cc780848811ec480 */
.service("$utils", [function () {
    return {
        obj2QueryString : function(obj, prefix) {
            var str = [];
            for (var p in obj) {
                var k = prefix ? prefix + "[" + p + "]" : p,
                    v = obj[p];
                str.push(angular.isObject(v) ? this.obj2QueryString(v, k) : (k) + "=" + encodeURIComponent(v));
            }
            return str.join("&");
        }
    };
}]);