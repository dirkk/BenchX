// global 400 handler
//	http://stackoverflow.com/questions/11971213/error-401-handling-with-angularjs
angular.module('Error', []).config(function($httpProvider) {
	$httpProvider.responseInterceptors.push('Interceptor400');
})
// register the interceptor as a service, intercepts ALL angular ajax http calls
.factory('Interceptor400', [ '$q', '$location', function($q, $location) {
	var err = "no error detected";
	return function(promise) {
		return promise.then(function(response) {
			return response;

		}, function(response) {
			var status = response.status;
			if (status == 404) {
				var deferred = $q.defer();
				var req = {
					config : response.config,
					deferred : deferred
				}
				err = response.data
				$location.path("/404")
				alert("Error (code=404) : " + response.data);
				// ErrorCtrl.logError(response.data);
			}
			// otherwise
			return $q.reject(response);
		});
	};
} ])