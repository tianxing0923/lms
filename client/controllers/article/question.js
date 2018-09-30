// 我的问题
module.exports = function (lmsApp) {
  lmsApp.controller('article.question', ['$scope', '$mdDialog', 'message', 'articlesApi', function ($scope, $mdDialog, message, articlesApi) {

    // 列表数据
    $scope.list = [];

    // 搜索条件
    $scope.searcher = {
      type: 'question',
      page: 1,
      size: 10,
      total: 0
    };

    // 获取列表数据
    $scope.getList = function () {
      articlesApi.listBySelf($scope.searcher).then(function (result) {
        $scope.list = result.list;
        $scope.searcher.page = result.page;
        $scope.searcher.size = result.size;
        $scope.searcher.total = result.total;
      });
    };

    // 显示删除dialog
    $scope.showDeleteDialog = function (e, item) {
       var confirm = $mdDialog.confirm()
        .title('确定要删除该分享吗？')
        .targetEvent(e)
        .ok('确定')
        .cancel('取消');

      $mdDialog.show(confirm).then(function() {
        articlesApi.delete(item._id).then(function (result) {
          message.success('删除成功！');
          $mdDialog.cancel();
          $scope.getList();
        });
      }, function() {});
    };

    var init = function () {
      $scope.getList();
    };

    init();
  }]);
};