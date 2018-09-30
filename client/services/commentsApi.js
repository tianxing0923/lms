// 评论api
module.exports = function (services) {
  angular.module(services).service('commentsApi', ['$http', '$q', 'utility', function ($http, $q, utility) {

    /**
     * 获取列表数据
     * @param  {object} params 搜索参数
     * @return {object}        列表数据
     */
    this.list = function (params) {
      var d = $q.defer();
      $http({
        url: '/api/comments',
        params: params,
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

    /**
     * 获取我的评论列表数据
     * @param  {object} params 搜索参数
     * @return {object}        列表数据
     */
    this.listBySelf = function (params) {
      var d = $q.defer();
      $http({
        url: '/api/comments/self',
        params: params,
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
        url: '/api/comments',
        data: data
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

    /**
     * 添加评论回复
     * @param  {object} data 数据
     * @return {string}      操作提示
     */
    this.addReply = function (data) {
      var d = $q.defer();
      $http({
        method: 'POST',
        url: '/api/comments/reply',
        data: data
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

    /**
     * 修改评论
     * @param  {object} data 数据
     * @return {string}      操作提示
     */
    this.edit = function (data) {
      var d = $q.defer();
      $http({
        method: 'PUT',
        url: '/api/comments/' + data._id,
        data: data
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };


    /**
     * 修改评论回复
     * @param  {string} commentId 评论ID
     * @param  {object} data      数据
     * @return {string}           操作提示
     */
    this.editReply = function (commentId, data) {
      var d = $q.defer();
      $http({
        method: 'PUT',
        url: '/api/comments/' + commentId + '/' + data._id,
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
        url: '/api/comments/' + id
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

    /**
     * 删除评论回复
     * @param  {string} commentId 评论ID
     * @param  {string} id        回复ID
     * @return {string}    操作提示
     */
    this.deleteReply = function (commentId, id) {
      var d = $q.defer();
      $http({
        method: 'DELETE',
        url: '/api/comments/' + commentId + '/' + id
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };
  }]);
};