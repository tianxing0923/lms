// 文章管理
module.exports = function (lmsApp) {
  lmsApp.controller('admin.article', ['$scope', '$mdDialog', 'message', 'articlesApi', function ($scope, $mdDialog, message, articlesApi) {

    // 列表数据
    $scope.list = [];

    // 搜索条件
    $scope.searcher = {
      page: 1,
      size: 20,
      total: 0
    };

    // 获取列表数据
    $scope.getList = function () {
      articlesApi.listByAdmin($scope.searcher).then(function (result) {
        $scope.list = result.list;
        $scope.searcher.page = result.page;
        $scope.searcher.size = result.size;
        $scope.searcher.total = result.total;
      });
    };

    // 设为精华
    $scope.showEssenceDialog = function (e, item) {
      var confirm = $mdDialog.confirm()
        .title('确定要设置为精华吗？')
        .targetEvent(e)
        .ok('确定')
        .cancel('取消');

      $mdDialog.show(confirm).then(function() {
        articlesApi.action({
          id: item._id,
          action: 'essence'
        }).then(function (result) {
          message.success('设置成功！');
          $mdDialog.cancel();
          $scope.getList();
        });
      }, function() {});
    };

    // 设为置顶
    $scope.showTopDialog = function (e, item) {
      var confirm = $mdDialog.confirm()
        .title('确定要设置为置顶吗？')
        .targetEvent(e)
        .ok('确定')
        .cancel('取消');

      $mdDialog.show(confirm).then(function() {
        articlesApi.action({
          id: item._id,
          action: 'top'
        }).then(function (result) {
          message.success('设置成功！');
          $mdDialog.cancel();
          $scope.getList();
        });
      }, function() {});
    };

    // 显示删除dialog
    $scope.showDeleteDialog = function (e, item) {
      var confirm = $mdDialog.confirm()
        .title('确定要删除该文章吗？')
        .targetEvent(e)
        .ok('确定')
        .cancel('取消');

      $mdDialog.show(confirm).then(function() {
        articlesApi.deleteByAdmin(item._id).then(function (result) {
          message.success('删除成功！');
          $mdDialog.cancel();
          $scope.getList();
        });
      }, function() {});
    };

    // 初始化
    var init = function () {
      $scope.getList();
    };

    init();
  }]);
};