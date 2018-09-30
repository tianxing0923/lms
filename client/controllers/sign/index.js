// 登录
module.exports = function (lmsApp) {
  lmsApp.controller('signin', ['$scope', 'usersApi', function ($scope, usersApi) {

    // 表单
    $scope.form = {
      username: '',
      password: ''
    };

    // 登录
    $scope.signin = function () {
      usersApi.signin($scope.form).then(function (result) {
        location.href = '/';
      });
    };
  }]);
};