// 侧边栏
module.exports = function (lmsApp) {
  lmsApp.controller('sidebar', ['$scope', 'usersApi', function ($scope, usersApi) {

    // 用户信息
    $scope.user = {};

    // 获取当前登录用户信息
    var getCurrentUser = function () {
      usersApi.current().then(function (data) {
        $scope.user = data;
      });
    }

    // 初始化
    var init = function () {
      getCurrentUser();
    };

    init();
  }]);
};