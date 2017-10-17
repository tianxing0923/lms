// 课程管理
module.exports = function (lmsApp) {
  lmsApp.controller('admin.course', ['$scope', '$mdDialog', 'coursesApi', function ($scope, $mdDialog, coursesApi) {

    // 列表数据
    $scope.list = [];

    // 搜索条件
    $scope.searcher = {
      page: 1,
      size: 10,
      total: 0
    };

    // 获取列表数据
    $scope.getList = function () {
      coursesApi.getList().then(function (result) {
        $scope.list = result.items;
        $scope.searcher.page = result.pageNumber;
        $scope.searcher.size = result.pageSize;
        $scope.searcher.total = result.totalItemCount;
      });
    }

    // 显示新增dialog
    $scope.showAddDialog = function (e) {
      $mdDialog.show({
        controller: 'admin.course.add',
        templateUrl: '/templates/admin/course/add.html',
        fullscreen: true,
        locals: {
          getList: $scope.getList
        },
        bindToController: true
      });
    };

    // 显示编辑dialog
    $scope.showEditDialog = function (e, item) {
      $mdDialog.show({
        controller: 'courseEdit',
        templateUrl: '/templates/admin/course/edit.html',
        parent: angular.element(document.body),
        targetEvent: e,
        locals: {
          id: item.id,
          getList: $scope.getList
        },
        bindToController: true
      });
    };
  }]);
};