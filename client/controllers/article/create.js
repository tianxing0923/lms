// 创建文章
module.exports = function (lmsApp) {
  lmsApp.controller('article.create', ['$scope', '$stateParams', '$location', 'message', 'articlesApi', 'categoriesApi', function ($scope, $stateParams, $location, message, articlesApi, categoriesApi) {

    // 分类
    $scope.categories = [];

    $scope.editerConfig = {
      heightMin: 300,
      heightMax: 500,

      // toolbar配置
      toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'embedly', 'insertTable', '|', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],

      // image配置
      imageUploadURL: '/api/upload/image'
    };

    // 表单
    $scope.form = {
      type: $stateParams.type || '', // 类型
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
      articlesApi.add($scope.form).then(function (result) {
        message.success('提交成功！');
        $location.url('/article/' + $scope.form.type);
      });
    };

    // 取消
    $scope.cancel = function () {
      $location.url('/article/' + $scope.form.type);
    };

    // 获取分类列表
    var getCategories = function () {
      categoriesApi.list().then(function (result) {
        $scope.categories = result;
      });
    }

    // 初始化
    var init = function () {
      getCategories();
    };

    init();
  }]);
};