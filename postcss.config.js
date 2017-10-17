module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        'Explorer >= 8',
        'Firefox >= 30',
        'Chrome >= 36',
        'Safari >= 7',
        'iOS >= 7',
        'Android >= 4'
      ]
    })
  ]
}