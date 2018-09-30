// 配置项
module.exports = function (services) {
  angular.module(services).service('config', function () {
    return process.env;
  });
};


