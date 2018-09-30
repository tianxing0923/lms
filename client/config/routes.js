module.exports = function (lmsApp) {

  // 路由配置
  lmsApp.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.when('/', '/home');
    $urlRouterProvider.when('/admin', '/admin/article');

    $stateProvider.state('signin', {
      url: '/signin',
      templateUrl: '/templates/signin.html'
    });

    // 首页
    $stateProvider.state('client', {
      url: '',
      abstract: true,
      templateUrl: '/templates/client.html'
    });

    $stateProvider.state('client.home', {
      url: '/home',
      templateUrl: '/templates/home/index.html'
    });

    // 精华
    $stateProvider.state('client.essence', {
      url: '/essence',
      templateUrl: '/templates/essence/index.html'
    });

    // 分享
    $stateProvider.state('client.share', {
      url: '/share',
      templateUrl: '/templates/share/index.html'
    });

    // 问答
    $stateProvider.state('client.question', {
      url: '/question',
      templateUrl: '/templates/question/index.html'
    });


    // 课程
    $stateProvider.state('course', {
      url: '/course',
      abstract: true,
      templateUrl: '/templates/client.html'
    });
    // 课程列表
    $stateProvider.state('course.list', {
      url: '',
      templateUrl: '/templates/course/index.html'
    });
    // 课程详情
    $stateProvider.state('course.detail', {
      url: '/:id',
      templateUrl: '/templates/course/detail.html'
    });




    /*********************我的文章*********************/
    $stateProvider.state('article', {
      url: '/article',
      templateUrl: '/templates/client.html'
    });
    $stateProvider.state('article.share', {
      url: '/share',
      templateUrl: '/templates/article/share.html',
      title: '我的分享'
    });
    $stateProvider.state('article.question', {
      url: '/question',
      templateUrl: '/templates/article/question.html',
      title: '我的问题'
    });
    $stateProvider.state('article.reply', {
      url: '/reply',
      templateUrl: '/templates/article/reply.html',
      title: '我的回复'
    });
    $stateProvider.state('article.create', {
      url: '/create?type',
      params: {
        type: {
          value: 'share'
        }
      },
      templateUrl: '/templates/article/create.html',
      title: '发布文章'
    });
    $stateProvider.state('article.edit', {
      url: '/edit?id',
      params: {
        id: {
          value: null
        }
      },
      templateUrl: '/templates/article/edit.html',
      title: '修改文章'
    });
    $stateProvider.state('article.detail', {
      url: '/:id',
      templateUrl: '/templates/article/detail.html'
    });














    /*********************后台管理*********************/

    // 后台管理
    $stateProvider.state('admin', {
      url: '/admin',
      abstract: true,
      templateUrl: '/templates/admin.html'
    });



    /*********************文章管理*********************/

    // 文章管理
    $stateProvider.state('admin.article', {
      url: '',
      template: '<ui-view></ui-view>',
    });

    // 文章列表
    $stateProvider.state('admin.article.list', {
      url: '/article',
      templateUrl: '/templates/admin/article/list.html',
      title: '文章管理'
    });



    /*********************课程管理*********************/

    // 课程管理
    $stateProvider.state('admin.course', {
      url: '',
      template: '<ui-view></ui-view>',
    });

    // 课程列表
    $stateProvider.state('admin.course.list', {
      url: '/course',
      templateUrl: '/templates/admin/course/list.html',
      title: '课程管理'
    });

    // 课程添加
    $stateProvider.state('admin.course.add', {
      url: '/course/add',
      templateUrl: '/templates/admin/course/add.html',
      title: '新增课程'
    });

    // 课程修改
    $stateProvider.state('admin.course.edit', {
      url: '/course/edit?id',
      params: {
        id: {
          value: null
        }
      },
      templateUrl: '/templates/admin/course/edit.html',
      title: '修改课程'
    });



    /*********************分类管理*********************/

    // 分类管理
    $stateProvider.state('admin.category', {
      url: '',
      template: '<ui-view></ui-view>',
    });

    // 分类列表
    $stateProvider.state('admin.category.list', {
      url: '/category',
      templateUrl: '/templates/admin/category/list.html',
      title: '分类管理'
    });



    /*********************用户管理*********************/

    // 用户管理
    $stateProvider.state('admin.user', {
      url: '',
      template: '<ui-view></ui-view>',
    });

    // 用户列表
    $stateProvider.state('admin.user.list', {
      url: '/user',
      templateUrl: '/templates/admin/user/list.html',
      title: '用户管理'
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
      $rootScope.state = toState;
      $rootScope.stateName = toState.name;
      $rootScope.stateParams = toParams;
      $rootScope.title = toState.title || '';
      $rootScope.loading = false;
    });

    $rootScope.$on('$stateChangeError', function (e, toState, toParams, fromState, fromParams, error) {
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