module.exports = function (env) {
  switch (env) {
  case 'prod':
  case 'production':
    return require('./config/webpack.prod')({
      env: 'production'
    });
    break;
  case 'test':
  case 'testing':
    return require('./config/webpack.test')({
      env: 'test'
    });
    break;
  case 'dev':
  case 'development':
  default:
    return require('./config/webpack.dev')({
      env: 'development'
    });
  }
}