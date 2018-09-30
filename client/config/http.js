module.exports = function (lmsApp) {
  lmsApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;

    $httpProvider.interceptors.push(['$q', '$injector', '$rootScope', function ($q, $injector, $rootScope) {
      return {
        request: function (config) {
          $rootScope.loading = true;
          return config || $q.when(config);
        },
        response: function (result) {
          $rootScope.loading = false;
          return result || $q.when(result);
        },
        responseError: function (result) {
          $rootScope.loading = false;
          var utility = $injector.get('utility');
          utility.resultHandler(null, result);
          console.log('http error', result);
          return $q.reject(result);
        }
      };
    }]);
  }]);
};