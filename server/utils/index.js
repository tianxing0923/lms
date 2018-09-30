var utils = {
  // 获取随机文件名
  getFilename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      var filename = err ? undefined : raw.toString('hex');
      if (filename) {
        let suffix = file.originalname.substring(file.originalname.lastIndexOf('.')).toLowerCase();
        cb(null, filename + suffix);
      }
    });
  }
};

module.exports = utils;