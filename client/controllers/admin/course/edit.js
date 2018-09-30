// 课程管理
module.exports = function (lmsApp) {
  lmsApp.controller('admin.course.edit', ['$scope', '$stateParams', '$location', 'message', 'coursesApi', 'categoriesApi', function ($scope, $stateParams, $location, message, coursesApi, categoriesApi) {
    var me = this;

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
      coursesApi.edit($scope.form).then(function (result) {
        message.success('修改成功！');
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

    // 获取详情
    var getDetail = function () {
      coursesApi.detail($stateParams.id).then(function (result) {
        $scope.form = result;
      });
    };

    // 初始化
    var init = function () {
      if ($stateParams.id) {
        getCategories();
        getDetail();
      } else {
        message.error('参数错误！');
      }
    };

    init();
  }]);
};