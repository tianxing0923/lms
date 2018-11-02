// 根控制器
module.exports = function (lmsApp) {
  lmsApp.controller('main', ['$scope', '$rootScope', 'usersApi', function ($scope, $rootScope, usersApi) {

    // 登录用户信息
    $rootScope.guser = {};

    // 获取当前登录用户信息
    var getCurrentUser = function () {
      usersApi.current().then(function (data) {
        $rootScope.guser = data;
        if (!data.avatar) {
          $rootScope.guser.avatar = '/images/avatar.png';
        }
      });
    }

    // 初始化
    var init = function () {
      if ($rootScope.stateName !== 'signin') {
        getCurrentUser();
      }
    };

    init();
  }]);
};