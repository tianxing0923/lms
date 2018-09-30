// 课程管理
module.exports = function (lmsApp) {
  lmsApp.controller('admin.user.edit', ['$scope', '$mdDialog', 'message', 'usersApi', function ($scope, $mdDialog, message, usersApi) {
    var me = this;

    // 表单
    $scope.form = this.item;

    // 提交
    $scope.submit = function () {
      usersApi.edit($scope.form).then(function (result) {
        message.success('修改成功！');
        $mdDialog.cancel();
        me.getList();
      });
    };

    // 关闭dialog
    $scope.close = function () {
      $mdDialog.cancel();
    };
  }]);
};