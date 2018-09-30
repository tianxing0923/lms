// 文章api
module.exports = function (services) {
  angular.module(services).service('articlesApi', ['$http', '$q', 'utility', function ($http, $q, utility) {

    /**
     * 获取列表数据
     * @param  {object} params 搜索参数
     * @return {object}        列表数据
     */
    this.list = function (params) {
      var d = $q.defer();
      $http({
        url: '/api/articles',
        params: params,
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

    /**
     * 获取我的文章列表数据
     * @param  {object} params 搜索参数
     * @return {object}        列表数据
     */
    this.listBySelf = function (params) {
      var d = $q.defer();
      $http({
        url: '/api/articles/self',
        params: params,
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

    /**
     * 获得单条数据
     * @param  {string} id 文章ID
     * @return {object}    用户详情
     */
    this.detail = function (id) {
      var d = $q.defer();
      $http({
        url: '/api/articles/' + id
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

    /**
     * 获得单条数据【用于编辑】
     * @param  {string} id 文章ID
     * @return {object}    用户详情
     */
    this.loadbyedit = function (id) {
      var d = $q.defer();
      $http({
        url: '/api/articles/loadbyedit/' + id
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
        url: '/api/articles',
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
        url: '/api/articles/' + data._id,
        data: data
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

    /**
     * 删除数据
     * @param  {string} id 文章ID
     * @return {string}    操作提示
     */
    this.delete = function (id) {
      var d = $q.defer();
      $http({
        method: 'DELETE',
        url: '/api/articles/' + id
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };


    /*********************后台使用*********************/


    /**
     * 获取列表数据
     * @param  {object} params 搜索参数
     * @return {object}        列表数据
     */
    this.listByAdmin = function (params) {
      var d = $q.defer();
      $http({
        url: '/api/admin/articles',
        params: params,
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

    /**
     * 设为精华、取消精华、设为置顶、取消置顶
     * @param  {string} data 数据
     * @return {string}      操作提示
     */
    this.action = function (data) {
      var d = $q.defer();
      $http({
        method: 'PUT',
        url: '/api/admin/articles/' + data.id,
        data: data
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

    /**
     * 删除数据
     * @param  {string} id 文章ID
     * @return {string}    操作提示
     */
    this.deleteByAdmin = function (id) {
      var d = $q.defer();
      $http({
        method: 'DELETE',
        url: '/api/admin/articles/' + id
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

  }]);
};