// 课程管理
module.exports = function (lmsApp) {
  lmsApp.controller('admin.category.add', ['$scope', '$mdDialog', 'message', 'categoriesApi', function ($scope, $mdDialog, message, categoriesApi) {
    var me = this;

    // 是否是添加
    $scope.isAdd = true;

    // 表单
    $scope.form = {
      name: '', // 名称
      description: '' // 描述
    };

    // 提交
    $scope.submit = function () {
      categoriesApi.add($scope.form).then(function (result) {
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