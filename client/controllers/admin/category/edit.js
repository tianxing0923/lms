// 课程管理
module.exports = function (lmsApp) {
  lmsApp.controller('admin.category.edit', ['$scope', '$mdDialog', 'message', 'categoriesApi', function ($scope, $mdDialog, message, categoriesApi) {
    var me = this;

    // 表单
    $scope.form = this.item;

    // 提交
    $scope.submit = function () {
      categoriesApi.edit($scope.form).then(function (result) {
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