// 课程管理
module.exports = function (lmsApp) {
  lmsApp.controller('admin.course.add', ['$scope', '$rootScope', '$mdDialog', 'message', 'coursesApi', function ($scope, $rootScope, $mdDialog, message, coursesApi) {
    var me = this;

    $rootScope.titleName = '新增课程';

    // 是否是添加
    $scope.isAdd = true;

    $scope.froalaOpts = {
      toolbarButtons: ["bold", "italic", "underline", "|", "align", "formatOL", "formatUL"]
    };

    // 表单
    $scope.form = {
      title: '', // 标题
      lecturer: '', // 讲师
      lecturerIntroduction: '', // 讲师介绍
      category: '', // 分类ID
      summary: '', // 概述
      content: '', // 内容
    };

    // 提交
    $scope.submit = function () {
      coursesApi.addData($scope.form).then(function (result) {
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