// 登录
module.exports = function (lmsApp) {
  lmsApp.controller('signin', ['$scope', function ($scope) {
    $scope.signin = {
      username: '',
      password: '',
      autosignin: true
    };

    $scope.authenticate = function () {

    };
  }]);
};