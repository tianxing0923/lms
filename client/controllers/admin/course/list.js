// 课程管理
module.exports = function (lmsApp) {
  lmsApp.controller('admin.course', ['$scope', '$mdDialog', 'message', 'coursesApi', 'categoriesApi', function ($scope, $mdDialog, message, coursesApi, categoriesApi) {

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
      coursesApi.list($scope.searcher).then(function (result) {
        $scope.list = result.list;
        $scope.searcher.page = result.page;
        $scope.searcher.size = result.size;
        $scope.searcher.total = result.total;
      });
    };

    // 显示删除dialog
    $scope.showDeleteDialog = function (e, item) {
       var confirm = $mdDialog.confirm()
        .title('确定要删除该课程吗？')
        .targetEvent(e)
        .ok('确定')
        .cancel('取消');

      $mdDialog.show(confirm).then(function() {
        coursesApi.delete(item._id).then(function (result) {
          message.success('删除成功！');
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