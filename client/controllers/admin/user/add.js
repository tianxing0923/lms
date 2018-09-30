// 课程管理
module.exports = function (lmsApp) {
  lmsApp.controller('admin.user.add', ['$scope', '$mdDialog', 'message', 'usersApi', function ($scope, $mdDialog, message, usersApi) {
    var me = this;

    // 是否是添加
    $scope.isAdd = true;

    // 表单
    $scope.form = {
      username: '', // 用户名
      password: '', // 密码
      name: '', // 姓名
      department: '', // 部门
      position: '' // 职位
    };

    // 提交
    $scope.submit = function () {
      usersApi.add($scope.form).then(function (result) {
        message.success('添加成功！');
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