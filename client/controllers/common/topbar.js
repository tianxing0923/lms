// 顶部
module.exports = function (lmsApp) {
  lmsApp.controller('topbar', ['$scope', '$mdSidenav', 'usersApi', function ($scope, $mdSidenav, usersApi) {

    // 展开侧边栏
    $scope.toggle = function () {
      $mdSidenav('left').toggle();
    }

    // 退出
    $scope.signout = function () {
      usersApi.signout().then(function () {
        console.log('signout');
        location.href = '/signin';
      });
    };
  }]);
};