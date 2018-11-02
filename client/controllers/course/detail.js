// 课程详情
module.exports = function (lmsApp) {
  lmsApp.controller('course.detail', ['$scope', '$sce', '$stateParams', '$location', '$mdDialog', 'message', 'coursesApi', 'commentsApi', function ($scope, $sce, $stateParams, $location, $mdDialog, message, coursesApi, commentsApi) {

    // 编辑器配置
    $scope.editerConfig = {
      heightMin: 150,
      toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'color', '|', 'formatOL', 'formatUL', 'insertLink', 'insertImage', 'embedly', 'insertTable', '|', 'selectAll', 'clearFormatting', 'spellChecker', 'html', 'undo', 'redo'],
    };

    // 详情
    $scope.detail = {};

    // 回复列表
    $scope.comments = [];

    // 课程回复
    $scope.comment = {
      courseId: $stateParams.id,
      type: 'course',
      content: '',
      invalid: false
    };

    // 评论回复
    $scope.reply = {
      commentId: '',
      content: '',
      invalid: false
    };

    // 解决html显示问题
    $scope.safeHtml = function (content) {
      return $sce.trustAsHtml(content);
    };

    // 计算评论数量
    $scope.commentsCount = function (comments) {
      var count = comments.length;
      for (var i = comments.length - 1; i >= 0; i--) {
        count += comments[i].replies.length;
      }
      return count;
    };

    // 显示回复富文本
    $scope.showReply = function (item) {
      $scope.reply.commentId = item._id;
      $scope.reply.content = '';
    };

    // 回复评论
    $scope.replyComment = function () {
      if ($.trim($scope.reply.content) == '') {
        $scope.reply.invalid = true;
        return;
      }
      $scope.reply.invalid = false;
      commentsApi.addReply({
        commentId: $scope.reply.commentId,
        content: $scope.reply.content
      }).then(function (result) {
        message.success('回复成功！');
        $scope.reply.content = '';
        getComments();
      });
    };

    // 取消回复评论
    $scope.cancel = function () {
      $scope.reply.commentId = '';
      $scope.reply.content = '';
    };

    // 提交回复
    $scope.submit = function () {
      if ($.trim($scope.comment.content) == '') {
        $scope.comment.invalid = true;
        return;
      }
      $scope.comment.invalid = false;
      commentsApi.add({
        reference: $scope.comment.courseId,
        type: $scope.comment.type,
        content: $scope.comment.content
      }).then(function (result) {
        message.success('回复成功！');
        $scope.comment.content = '';
        getComments();
      });
    };

    // 删除评论
    $scope.deleteComment = function (item) {
      var confirm = $mdDialog.confirm()
        .title('确定要删除该回复吗？')
        .ok('确定')
        .cancel('取消');

      $mdDialog.show(confirm).then(function () {
        commentsApi.delete(item._id).then(function (result) {
          message.success('删除成功！');
          getComments();
        });
      }, function () {});
    };

    // 删除评论回复
    $scope.deleteReply = function (comment, item) {
      var confirm = $mdDialog.confirm()
        .title('确定要删除该回复吗？')
        .ok('确定')
        .cancel('取消');

      $mdDialog.show(confirm).then(function () {
        commentsApi.deleteReply(comment._id, item._id).then(function (result) {
          message.success('删除成功！');
          getComments();
        });
      }, function () {});
    };

    // 获取详情
    var getDetail = function () {
      coursesApi.detail($stateParams.id).then(function (result) {
        $scope.detail = result;
        getComments();
      });
    };

    // 获取回复列表
    var getComments = function () {
      commentsApi.list({
        reference: $scope.detail._id
      }).then(function (result) {
        $scope.comments = result;
      });
    };

    // 初始化
    var init = function () {
      if ($stateParams.id) {
        getDetail();
      } else {
        message.error('参数错误！');
      }
    };

    init();
  }]);
};