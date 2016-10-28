'use strict';

lmsApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    controller: 'indexCtrl',
    templateUrl: '/'
  });
  $routeProvider.when('/audio', {
    templateUrl: '/views/media/audio.html',
    controller: 'media.audio'
  });
  $routeProvider.otherwise({
    redirectTo: '/'
  });
}]);