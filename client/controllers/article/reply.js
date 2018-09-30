// 我的参与回复的文章
module.exports = function (lmsApp) {
  lmsApp.controller('article.reply', ['$scope', '$mdDialog', 'message', 'commentsApi', function ($scope, $mdDialog, message, commentsApi) {

    // 列表数据
    $scope.list = [];

    // 搜索条件
    $scope.searcher = {
      type: 'article'
    };

    // 课程搜索条件
    $scope.changeType = function (type) {
      $scope.searcher.type = type;
      $scope.getList();
    };

    // 获取列表数据
    $scope.getList = function () {
      $scope.list = [];
      commentsApi.listBySelf($scope.searcher).then(function (result) {
        $scope.list = result;
      });
    };

    var init = function () {
      $scope.getList();
    };

    init();
  }]);
};