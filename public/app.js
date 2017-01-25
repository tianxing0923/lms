'use strict';
var lmsApp = angular.module('lms', [
  'ngAnimate',
  'ngAria',
  'ngMessages',
  'ngMaterial',
  'ui.router',
  'lms.services',
  'lms.filters',
  'lms.directives'
]);

// 导航
lmsApp.controller('navbar', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
    $scope.current = toState.name;
    $rootScope.loading = true;
  });

  $rootScope.$on('$stateChangeSuccess', function (e) {
    $rootScope.loading = false;
  });

  $rootScope.$on('$stateChangeError', function (e) {
    $rootScope.loading = false;
  });

  $scope.signout = function () {
    console.log('signout');
  };
}]);

// 侧边栏
lmsApp.controller('sidebar', ['$scope', function ($scope) {

}]);