import 'angular-material/angular-material.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import 'angular-material-data-table/dist/md-data-table.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import './assets/less/styles.less';

// framework and plugins
import 'jquery';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/js/languages/zh_cn';
import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-messages';
import 'angular-ui-router';
import 'angular-material';
import 'angular-material-data-table';
import 'angular-froala';

// configs
import date from './config/date';
import froala from './config/froala';
import http from './config/http';
import icons from './config/icons';
import routes from './config/routes';
import theme from './config/theme';

// modules
import services from './services';
import filters from './filters';
import directives from './directives';

// filters
import friendly from './filters/friendly';
import green from './filters/green';
import avatar from './filters/avatar';

// services
import config from './services/config';
import message from './services/message';
import utility from './services/utility';
import coursesApi from './services/coursesApi';
import usersApi from './services/usersApi';
import categoriesApi from './services/categoriesApi';
import articlesApi from './services/articlesApi';
import commentsApi from './services/commentsApi';

// controllers
import sign from './controllers/sign';

import main from './controllers/common/main';

import navbar from './controllers/common/navbar';
import sidebar from './controllers/common/sidebar';
import topbar from './controllers/common/topbar';

// client
import home from './controllers/home';
import essence from './controllers/essence';
import share from './controllers/share';
import question from './controllers/question';
import course from './controllers/course';
import courseDetail from './controllers/course/detail';


import articleDetail from './controllers/article/detail';
import articleShare from './controllers/article/share';
import articleQuestion from './controllers/article/question';
import articleCreate from './controllers/article/create';
import articleEidt from './controllers/article/edit';
import articleReply from './controllers/article/reply';







// admin.course
import adminCourseList from './controllers/admin/course/list';
import adminCourseAdd from './controllers/admin/course/add';
import adminCourseEdit from './controllers/admin/course/edit';

// admin.user
import adminUserList from './controllers/admin/user/list';
import adminUserAdd from './controllers/admin/user/add';
import adminUserEdit from './controllers/admin/user/edit';

// admin.category
import adminCategoryList from './controllers/admin/category/list';
import adminCategoryAdd from './controllers/admin/category/add';
import adminCategoryEdit from './controllers/admin/category/edit';

// admin.article
import adminArticleList from './controllers/admin/article/list';

var lmsApp = angular.module('lms', [
  'ngAnimate',
  'ngAria',
  'ngSanitize',
  'ngMessages',
  'ui.router',
  'ngMaterial',
  'md.data.table',
  'froala',
  services,
  filters,
  directives
]);

// utils services
config(services);
message(services);
utility(services);

// config
date(lmsApp);
froala(lmsApp);
http(lmsApp);
icons(lmsApp);
routes(lmsApp);
theme(lmsApp);

// filters
friendly(filters);
green(filters);
avatar(filters);

// directives

// services
coursesApi(services);
usersApi(services);
categoriesApi(services);
articlesApi(services);
commentsApi(services);

// sign
sign(lmsApp);

// common
main(lmsApp);
navbar(lmsApp);
sidebar(lmsApp);
topbar(lmsApp);

// client
home(lmsApp);
essence(lmsApp);
share(lmsApp);
question(lmsApp);
course(lmsApp);
courseDetail(lmsApp);

articleDetail(lmsApp);
articleShare(lmsApp);
articleQuestion(lmsApp);
articleCreate(lmsApp);
articleEidt(lmsApp);
articleReply(lmsApp);




// admin.course
adminCourseList(lmsApp);
adminCourseAdd(lmsApp);
adminCourseEdit(lmsApp);

// admin.user
adminUserList(lmsApp);
adminUserAdd(lmsApp);
adminUserEdit(lmsApp);

// admin.category
adminCategoryList(lmsApp);
adminCategoryAdd(lmsApp);
adminCategoryEdit(lmsApp);

// admin.article
adminArticleList(lmsApp);