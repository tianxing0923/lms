module.exports = function (lmsApp) {
  lmsApp.config(['$mdIconProvider', function ($mdIconProvider) {
    $mdIconProvider.fontSet('md', 'material-icons');
  }]);
};