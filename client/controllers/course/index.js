// 课程
module.exports = function (lmsApp) {
  lmsApp.controller('client.course', ['$scope', 'categoriesApi', 'coursesApi', function ($scope, categoriesApi, coursesApi) {

    // 分类
    $scope.categories = [];

    // 列表数据
    $scope.list = [];

    // 搜索条件
    $scope.searcher = {
      category: '',
      page: 1,
      size: 30,
      total: 0
    };

    // 切换分类
    $scope.changeCategory = function (e, item) {
      $scope.searcher.category = item._id;
      $scope.getList();
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

    // 获取分类列表
    var getCategories = function () {
      categoriesApi.list().then(function (result) {
        var data = [{
          _id: '',
          name: '全部'
        }];
        $scope.categories = data.concat(result);
      });
    };

    // 初始化
    var init = function () {
      getCategories();
      $scope.getList();
    };

    init();
  }]);
};