// 时间友好显示
module.exports = function (filters) {
  angular.module(filters).filter('green', ['$sce', function ($sce) {
    return function (date) {
      if (date) {
        return $sce.trustAsHtml('<span style="color: #4CAF50">是</span>');
      }
      return $sce.trustAsHtml('否');
    };
  }]);
};