// 分类api
module.exports = function (services) {
  angular.module(services).service('categoriesApi', ['$http', '$q', 'utility', function ($http, $q, utility) {

    /**
     * 获取列表数据
     * @param  {object} params 搜索参数
     * @return {object}        列表数据
     */
    this.list = function (params) {
      var d = $q.defer();
      $http({
        url: '/api/categories',
        params: params,
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

    /**
     * 获得单条数据
     * @param  {string} id 用户ID
     * @return {object}    用户详情
     */
    this.detail = function (id) {
      var d = $q.defer();
      $http({
        url: '/api/categories/' + id
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

    /**
     * 添加数据
     * @param  {object} data 数据
     * @return {string}      操作提示
     */
    this.add = function (data) {
      var d = $q.defer();
      $http({
        method: 'POST',
        url: '/api/categories',
        data: data
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

    /**
     * 修改数据
     * @param  {object} data 数据
     * @return {string}      操作提示
     */
    this.edit = function (data) {
      var d = $q.defer();
      $http({
        method: 'PUT',
        url: '/api/categories/' + data._id,
        data: data
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

    /**
     * 删除数据
     * @param  {string} id 用户ID
     * @return {string}    操作提示
     */
    this.delete = function (id) {
      var d = $q.defer();
      $http({
        method: 'DELETE',
        url: '/api/categories/' + id
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };
  }]);
};