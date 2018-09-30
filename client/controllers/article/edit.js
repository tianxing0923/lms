// 课程管理
module.exports = function (lmsApp) {
  lmsApp.controller('article.edit', ['$scope', '$stateParams', '$location', 'message', 'articlesApi', 'categoriesApi', function ($scope, $stateParams, $location, message, articlesApi, categoriesApi) {

    // 分类
    $scope.categories = [];

    $scope.editerConfig = {
      heightMin: 300,
      heightMax: 500,

      // toolbar配置
      toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'embedly', 'insertTable', '|', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'spellChecker', 'help', 'html', '|', 'undo', 'redo']
    };

    // 表单
    $scope.form = {
      title: '', // 标题
      categories: [], // 分类ID
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
      articlesApi.edit($scope.form).then(function (result) {
        message.success('修改成功！');
        $location.url('/article/' + $scope.form.type);
      });
    };

    // 取消
    $scope.cancel = function () {
      $location.url('/article/' + $scope.form.type);
    };

    // 获取分类列表
    var getCategories = function () {
      categoriesApi.list({
        page: 1,
        size: 99999
      }).then(function (result) {
        $scope.categories = result.list;
      });
    };

    // 获取详情
    var getDetail = function () {
      articlesApi.loadbyedit($stateParams.id).then(function (result) {
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