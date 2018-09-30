// 用户api
module.exports = function (services) {
  angular.module(services).service('usersApi', ['$http', '$q', 'utility', 'config', function ($http, $q, utility, config) {

    /**
     * 登录
     * @param  {object} data   参数
     * @return {string}        操作提示
     */
    this.signin = function (data) {
      var d = $q.defer();
      $http({
        method: 'POST',
        url: config.api + '/sign/in',
        data: data,
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

    /**
     * 获取当前用户信息
     * @return {object} 用户详情
     */
    this.current = function () {
      var d = $q.defer();
      $http({
        url: config.api + '/api/users/current'
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

    /**
     * 获取列表数据
     * @param  {object} params 搜索参数
     * @return {object}        列表数据
     */
    this.list = function (params) {
      var d = $q.defer();
      $http({
        url: config.api + '/api/users',
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
        url: config.api + '/api/users/' + id
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
        url: config.api + '/api/users',
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
        url: config.api + '/api/users/' + data._id,
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
        url: config.api + '/api/users/' + id
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };
  }]);
};