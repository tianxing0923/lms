module.exports = function (lmsApp) {
  lmsApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;

    $httpProvider.interceptors.push(['$q', '$rootScope', function ($q, $rootScope) {
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
          console.log('http error', result);
          if (result.status == 500) {
            console.log(500);
          } else {

          }
          return $q.reject(result);
        }
      };
    }]);
  }]);
};