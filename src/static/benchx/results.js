/*
 * Manage Benchmark results
 * @author andy bunce
 * @date 2014
 * @licence Apache 2
 */
angular.module('BenchX.results', [])
// r.suite() name of suite
// r.data()
.factory("results", [ "api","$q","$rootScope", function(api,$q,$rootScope) {
	var _data;  //the data
	var _activesuite = "";
	console.log("init results----------------------------");
	var _called = 0;
	return {
		suite : function(){return _activesuite},
		
		promise : function(suite) {
			if (_activesuite != suite) {
				_activesuite = suite;
				var p = api.suite(suite);
				p.then(function(d){
					_data=d;
					});
				return p;
			}else{
				var p= $q.defer();
				p.resolve(_data);
				return p.promise;
			}
		},
		
		data:function(){return _data},
		
		addRun:function(index,run){
			_data.queries[index].runs.push(run);
			$rootScope.$broadcast("session");
		},
		
		addcall : function() {
			_called++;
			console.log("times", _called,_data);
		},
		
		clear:function(){
			angular
			.forEach(
					_data.queries,
					function(
							v) {
						v.runs = [];
					});
			$rootScope.$broadcast("session");
		}
	};
} ]);
