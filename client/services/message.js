// 消息提示
module.exports = function (services) {
  angular.module(services).service('message', ['$mdToast', '$sce', function ($mdToast, $sce) {
    function showToast(type, content, delay) {
      $mdToast.show({
        toastClass: type,
        template: '<md-toast><div class="md-toast-content">' + content + '</div></md-toast>',
        position: 'top right',
        hideDelay: delay || 3000
      });
    }

    this.success = function (content, delay) {
      showToast('success', content, delay);
    };

    this.info = function (content, delay) {
      showToast('info', content, delay);
    };

    this.warning = function (content, delay) {
      showToast('warning', content, delay);
    };

    this.error = function (content, delay) {
      showToast('error', content, delay);
    };
  }]);
};