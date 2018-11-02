// 课程api
module.exports = function (services) {
  angular.module(services).service('coursesApi', ['$http', '$q', 'utility', function ($http, $q, utility) {

    /**
     * 获取列表数据
     * @param  {object} params 搜索参数
     * @return {object}        列表数据
     */
    this.list = function (params) {
      var d = $q.defer();
      $http({
        url: '/api/courses',
        params: params,
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

    /**
     * 获得单条数据
     * @param  {string} id 课程ID
     * @return {object}    课程详情
     */
    this.detail = function (id) {
      var d = $q.defer();
      $http({
        url: '/api/courses/' + id
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
        url: '/api/admin/courses',
        params: params,
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

    /**
     * 获得单条数据
     * @param  {string} id 课程ID
     * @return {object}    课程详情
     */
    this.detailByAdmin = function (id) {
      var d = $q.defer();
      $http({
        url: '/api/admin/courses/' + id
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
    this.addByAdmin = function (data) {
      var d = $q.defer();
      $http({
        method: 'POST',
        url: '/api/admin/courses',
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
        url: '/api/admin/courses/' + data._id,
        data: data
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };

    /**
     * 删除数据
     * @param  {string} id 课程ID
     * @return {string}    操作提示
     */
    this.delete = function (id) {
      var d = $q.defer();
      $http({
        method: 'DELETE',
        url: '/api/admin/courses/' + id
      }).then(function (result) {
        utility.resultHandler(d, result);
      });
      return d.promise;
    };
  }]);
};