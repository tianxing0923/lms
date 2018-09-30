// 时间友好显示
module.exports = function (filters) {
  angular.module(filters).filter('avatar', function () {
    return function (avatar) {
      return avatar ? avatar : require('../assets/images/avatar.png');
    };
  });
};