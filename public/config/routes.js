'use strict';

lmsApp.config(['$locationProvider', '$stateProvider', function ($locationProvider, $stateProvider) {
  $locationProvider.html5Mode(true);
  $stateProvider.state('home', {
    url: '/',
    templateUrl: '/templates/article/list'
  });
  $stateProvider.state('essence', {
    url: '/essence',
    templateUrl: '/templates/article/list'
  });
  $stateProvider.state('share', {
    url: '/share',
    templateUrl: '/templates/article/list'
  });
  $stateProvider.state('qestion', {
    url: '/qestion',
    templateUrl: '/templates/article/list'
  });
  $stateProvider.state('course', {
    url: '/course',
    template: 'bbb'
  });
  $stateProvider.state('article', {
    url: '/article',
    template: 'ccc'
  });
}]);