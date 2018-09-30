// 课程管理
module.exports = function (lmsApp) {
  lmsApp.controller('admin.course.add', ['$scope', '$location', 'message', 'coursesApi', 'categoriesApi', function ($scope, $location, message, coursesApi, categoriesApi) {

    // 分类
    $scope.categories = [];

    // 表单
    $scope.form = {
      title: '', // 标题
      lecturer: '', // 讲师
      lecturerIntroduction: '', // 讲师介绍
      categories: [], // 分类ID
      summary: '', // 概述
      content: '' // 内容
    };

    // 勾选分类
    $scope.selected = function (item) {
      var idx = $scope.form.categories.indexOf(item._id);
      if (idx != -1) {
        $scope.form.categories.splice(idx, 1);
      } else {
        $scope.form.categories.push(item._id);
      }
    };

    // 提交
    $scope.submit = function () {
      coursesApi.add($scope.form).then(function (result) {
        message.success('添加成功！');
        $location.url('/admin/course');
      });
    };

    // 获取分类列表
    var getCategories = function () {
      categoriesApi.list({
        page: 1,
        size: 99999
      }).then(function (result) {
        $scope.categories = result.list;
      });
    }

    // 初始化
    var init = function () {
      getCategories();
    };

    init();
  }]);
};