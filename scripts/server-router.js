const {
  assignRouter,
  routerRootPath,
  routerUploadSingleFile,
  routerImgPath,
  routerHtmlPath,
  routerJsFile,
  routerVideoPath
} = require('./server-router-handle')

const serverRouter = {
  '*': function (req, res, next) {
    console.info(`HTTP [${req.method}]`, req.path, req.baseUrl, req.params)
    next()
  },

  '/api': assignRouter,

  '/': routerRootPath,

  'html': routerHtmlPath,

  'image': routerImgPath,

  'video': routerVideoPath,

  'js': routerJsFile,

  'uploadSingleFile': routerUploadSingleFile
}

module.exports = serverRouter
