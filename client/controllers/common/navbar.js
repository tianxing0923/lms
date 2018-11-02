// 导航
module.exports = function (lmsApp) {
  lmsApp.controller('navbar', ['$scope', 'usersApi', function ($scope, usersApi) {

    // 退出
    $scope.signout = function () {
      usersApi.signout().then(function () {
        debugger
        console.log('signout');
        location.href = '/signin';
      });
    };
  }]);
};