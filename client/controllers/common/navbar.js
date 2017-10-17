// 导航
module.exports = function (lmsApp) {
  lmsApp.controller('navbar', ['$scope', function ($scope) {

    // 退出
    $scope.signout = function () {
      console.log('signout');
      location.href = '/signin.html';
    };
  }]);
};