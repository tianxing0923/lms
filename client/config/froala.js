module.exports = function (lmsApp) {
  lmsApp.value('froalaConfig', {
    language: 'zh_cn',
    heightMin: 300,
    placeholderText: '',
    toolbarSticky: false,
    // toolbarStickyOffset: 65,
    requestWithCredentials: true,

    // toolbar配置
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertTable', '|', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],

    linkAlwaysBlank: true,
    linkEditButtons: ['linkOpen', 'linkEdit', 'linkRemove'],
    linkList: [{
      displayText: 'Baidu',
      href: 'https://www.baidu.com/',
      target: '_blank'
    }],

    // image配置
    imageInsertButtons: ['imageUpload', 'imageByURL'],
    imageEditButtons: ['imageReplace', 'imageRemove', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', 'imageAlt'],
    imageUploadURL: '/api/admin/upload/image',
    imageDefaultWidth: 0,

    // video配置
    videoInsertButtons: ['videoBack', '|', 'videoUpload', 'videoEmbed', 'videoByURL'],
    videoEditButtons: ['videoReplace', 'videoRemove', 'videoSize'],
    videoUploadURL: '/api/admin/upload/video',
    videoDefaultWidth: 0,
    videoMove: false,
    videoMaxSize: 1024 * 1024 * 1024 * 2, // 2GB

    // 监听事件隐藏版权信息
    events: {
      'froalaEditor.initialized': function (e, editor) {
        editor.$box.find('.fr-view').prev().css({
          position: 'absolute',
          top: '-10000px',
          opacity: 0
        });
      }
    }
  });
};