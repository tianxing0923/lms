module.exports = function (lmsApp) {

  // 路由配置
  lmsApp.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.when('/', '/home');
    $urlRouterProvider.when('/admin', '/admin/course');

    // 首页
    $stateProvider.state('client', {
      url: '/',
      abstract: true,
      templateUrl: '/templates/client.html'
    });

    $stateProvider.state('client.home', {
      url: 'home',
      templateUrl: '/templates/article/list.html'
    });

    // 精华
    $stateProvider.state('client.essence', {
      url: 'essence',
      templateUrl: '/templates/article/list.html'
    });

    // 分享
    $stateProvider.state('client.share', {
      url: 'share',
      templateUrl: '/templates/article/list.html'
    });

    // 问答
    $stateProvider.state('client.qestion', {
      url: 'qestion',
      templateUrl: '/templates/article/list.html'
    });

    // 课程
    $stateProvider.state('client.course', {
      url: 'course',
      template: 'bbb'
    });

    // 文章
    $stateProvider.state('client.article', {
      url: 'article',
      template: 'ccc'
    });
    $stateProvider.state('articledetail', {
      url: '/article/:id',
      template: 'sdfsdfds'
    });




    // 后台管理
    $stateProvider.state('admin', {
      url: '/admin',
      abstract: true,
      templateUrl: '/templates/admin.html'
    });

    // 课程管理列表
    $stateProvider.state('admin.course', {
      url: '',
      template: '<ui-view></ui-view>',
    });

    // 课程管理列表
    $stateProvider.state('admin.course.list', {
      url: '/course',
      templateUrl: '/templates/admin/course/list.html',
    });

    // 课程添加
    $stateProvider.state('admin.course.add', {
      url: '/add',
      templateUrl: '/templates/admin/course/add.html',
      data: {
        title: '分类管理'
      }
    });

    // 分类管理
    $stateProvider.state('admin.category', {
      url: '/category',
      template: '分类管理',
      data: {
        title: '分类管理'
      }
    });

    // 用户管理
    $stateProvider.state('admin.user', {
      url: '/user',
      template: '用户管理',
      data: {
        title: '用户管理'
      }
    });

    // 角色管理
    $stateProvider.state('admin.role', {
      url: '/role',
      template: '角色管理',
      data: {
        title: '角色管理'
      }
    });
  }]);

  // 监听路由
  lmsApp.run(['$rootScope', '$log', '$state', '$stateParams', function ($rootScope, $log, $state, $stateParams) {
    $rootScope.state = $state.current;
    $rootScope.stateParams = $stateParams;
    $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
      $rootScope.loading = true;
    });

    $rootScope.$on('$stateChangeSuccess', function (e, toState, toParams, fromState, fromParams) {
      $rootScope.stateName = toState.name;
      $rootScope.state = toState;
      $rootScope.stateParams = toParams;
      $rootScope.loading = false;
    });

    $rootScope.$on('$stateChangeError', function (e, toState, toParams, fromState, fromParams) {
      $rootScope.loading = false;

      $log.error('An error occurred while changing states: ' + error);
      $log.debug('event', e);
      $log.debug('toState', toState);
      $log.debug('toParams', toParams);
      $log.debug('fromState', fromState);
      $log.debug('fromParams', fromParams);
    });

    $rootScope.$on('$stateNotFound', function (e, unfoundState, fromState, fromParams) {
      $log.error('The request state was not found: ' + unfoundState);
    });
  }]);
};