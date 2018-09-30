// 课程管理
module.exports = function (lmsApp) {
  lmsApp.controller('admin.user', ['$scope', '$mdDialog', 'message', 'usersApi', function ($scope, $mdDialog, message, usersApi) {

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
      usersApi.list($scope.searcher).then(function (result) {
        $scope.list = result.list;
        $scope.searcher.page = result.page;
        $scope.searcher.size = result.size;
        $scope.searcher.total = result.total;
      });
    };

    // 显示新增dialog
    $scope.showAddDialog = function (e) {
      $mdDialog.show({
        controller: 'admin.user.add',
        templateUrl: '/templates/admin/user/add.html',
        targetEvent: e,
        locals: {
          getList: $scope.getList
        },
        bindToController: true
      });
    };

    // 显示编辑dialog
    $scope.showEditDialog = function (e, item) {
      $mdDialog.show({
        controller: 'admin.user.edit',
        templateUrl: '/templates/admin/user/edit.html',
        targetEvent: e,
        locals: {
          item: angular.copy(item),
          getList: $scope.getList
        },
        bindToController: true
      });
    };

    // 显示删除dialog
    $scope.showDeleteDialog = function (e, item) {
       var confirm = $mdDialog.confirm()
        .title('确定要删除该用户吗？')
        .targetEvent(e)
        .ok('确定')
        .cancel('取消');

      $mdDialog.show(confirm).then(function() {
        usersApi.delete(item._id).then(function (result) {
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