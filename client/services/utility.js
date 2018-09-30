module.exports = function (services) {
  angular.module(services).service('utility', ['$timeout', 'message', function ($timeout, message) {

    /**
     * 检查结果状态信息
     * @param  {object} d         $q.defer()
     * @param  {object} result    返回的数据对象
     */
    this.resultHandler = function (d, result) {
      switch (result.status) {
      case 400:
        message.error('操作失败：' + result.data);
        break;
      case 401:
        message.error('未登录：' + result.data);
        location.href = '/signin';
        break;
      case 403:
        message.error('无权限：' + result.data);
        $timeout(function () {
          location.href = '/';
        }, 2000);
        break;
      case 404:
        message.error('找不到目标资源：' + result.data);
        break;
      case 422:
        message.error('参数错误：' + result.data);
        break;
      case 500:
        message.error('服务器异常：' + result.data);
        break;
      case 503:
        message.error('服务器维护中：' + result.data);
        break;
      case 504:
        message.error('网关超时：' + result.data);
        break;
      default:
        d.resolve(result.data);
        break;
      }
    };
  }]);
};