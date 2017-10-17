import 'angular-material/angular-material.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'angular-material-data-table/dist/md-data-table.css';
import '../public/less/styles.less';

// framework and plugins
import 'jquery';
import 'froala-editor';
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
import http from './config/http';
import icons from './config/icons';
import routes from './config/routes';
import theme from './config/theme';

// modules
import services from './services';
import filters from './filters';
import directives from './directives';

import friendly from './filters/friendly';
import pagination from './directives/pagination';
import message from './services/message';
import coursesApi from './services/coursesApi';

// controllers
import sign from './controllers/sign';

import navbar from './controllers/common/navbar';
import sidebar from './controllers/common/sidebar';
import topbar from './controllers/common/topbar';

// client
import home from './controllers/home';

// admin
import adminCourseList from './controllers/admin/course/list';
import adminCourseAdd from './controllers/admin/course/add';

var lmsApp = angular.module('lms', [
  'ngAnimate',
  'ngAria',
  'ngMessages',
  'ui.router',
  'ngMaterial',
  'md.data.table',
  'froala',
  services,
  filters,
  directives
]);

// config
date(lmsApp);
http(lmsApp);
icons(lmsApp);
routes(lmsApp);
theme(lmsApp);

// filters
friendly(filters);

// directives
pagination(directives);

// services
message(services);
coursesApi(services);

// sign
sign(lmsApp);

// common
navbar(lmsApp);
sidebar(lmsApp);
topbar(lmsApp);

// client
home(lmsApp);

// admin
adminCourseList(lmsApp);
adminCourseAdd(lmsApp);


