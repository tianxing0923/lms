// 课程api
module.exports = function (services) {
  angular.module(services).service('coursesApi', ['$http', '$q', function ($http, $q) {

    /**
     * 获取列表数据
     * @param  {object} params 搜索参数
     * @return {object}        列表数据
     */
    this.getList = function (params) {
      var d = $q.defer();
      $http({
        url: '/api/courses',
        params: params,
      }).then(function (result) {
        d.resolve(result);
      });
      return d.promise;
    };

    /**
     * 获得单条数据
     * @param  {string} id 课程ID
     * @return {object}    课程详情
     */
    this.getData = function (id) {
      var d = $q.defer();
      $http({
        method: 'GET',
        url: '/api/courses/' + id
      }).then(function (result) {
        d.resolve(result);
      });
      return d.promise;
    };

    /**
     * 添加数据
     * @param  {object} data 数据
     * @return {string}      操作提示
     */
    this.addData = function (data) {
      var d = $q.defer();
      $http({
        method: 'POST',
        url: '/api/courses',
        data: data
      }).then(function (result) {
        d.resolve(result);
      });
      return d.promise;
    };

    /**
     * 修改数据
     * @param  {object} data 数据
     * @return {string}      操作提示
     */
    this.editData = function (data) {
      var d = $q.defer();
      $http({
        method: 'PUT',
        url: '/api/courses/' + data.id,
        data: data
      }).then(function (result) {
        d.resolve(result);
      });
      return d.promise;
    };
  }]);
};