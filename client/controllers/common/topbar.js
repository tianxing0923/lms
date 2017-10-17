// 顶部
module.exports = function (lmsApp) {
  lmsApp.controller('topbar', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {

    // 展开侧边栏
    $scope.toggle = function () {
      $mdSidenav('left').toggle();
    }

    // 退出
    $scope.signout = function () {
      console.log('signout');
      location.href = '/signin.html';
    };
  }]);
};