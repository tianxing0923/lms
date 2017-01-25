angular.module('lms.filters', [])
  .filter('friendly', function () {
    return function (time) {
      var now = new Date().getTime();
      var value = '';
      var difference = parseInt(now - time);

      if (difference < 60) {
        // 1分钟内
        return '刚刚';
      } else if ((difference < 60 * 60) && (difference >= 60)) {
        // 超过1分钟少于1小时
        value = Math.floor(difference / 60);
        return value + '分钟前';
      } else if ((difference < 60 * 60 * 24) && (difference >= 60 * 60)) {
        // 超过1小时少于24小时
        value = Math.floor(difference / 60 / 60);
        return value + '小时前';
      } else if ((difference < 60 * 60 * 24 * 30) && (difference >= 60 * 60 * 24)) {
        // 超过1天少于30天内
        value = Math.floor(difference / 60 / 60 / 24);
        return value + '天前';
      } else if ((difference < 60 * 60 * 24 * 30 * 12) && (difference >= 60 * 60 * 24 * 30)) {
        // 超过30天少于1年
        value = Math.floor(difference / 60 / 60 / 24 / 30);
        return value + '个月前';
      } else {
        // 超过1年
        value = Math.floor(difference / 60 / 60 / 24 / 30 / 12);
        return value + '年前';
        var date = new Date(parseInt(time) * 1000);
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
      }
    };
  });