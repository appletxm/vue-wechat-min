const path = require('path')
const fs = require('fs')
// const formidable = require('formidable')
const env = require('../config/env')
// const syncCfg = require('./sync-cfg')

function getHtmlFile(filename, res, next) {
  fs.readFile(filename, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    }
    if (next) {
      next()
    }
  })
}

function getImageFile(filename, res, next) {
  console.info('[get image path]', filename)

  fs.readFile(filename, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.set('content-type', 'image/' + filename.match(/\.(\d)$/))
      res.send(result)
    }
    res.end()

    if (next) {
      next()
    }
  })
}

function getCssFile(filename, res, next) {
  console.info('[get css path]', filename)

  fs.readFile(filename, 'utf8', function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.set('content-type', 'text/css')
      res.send(result)
    }
    res.end()

    if (next) {
      next()
    }
  })
}

function getFontFile(filename, res, next) {
  console.info('[get font path]', filename)

  const matchedObj = filename.match(/.+\.([^\.]+)$/)
  const contentType = getContentType(matchedObj[1])

  fs.readFile(filename, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.set('content-type', contentType)
      res.send(result)
    }
    res.end()

    if (next) {
      next()
    }
  })
}

function getJsFile(filename, res, next) {
  console.info('[get js path]', filename)

  fs.readFile(filename, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.set('content-type', 'application/x-javascript')
      res.send(result)
    }
    res.end()

    if (next) {
      next()
    }
  })
}

function routerModules(req, res) {
  let url = req.originalUrl.replace(/\?.+$/, '')
  let filename = env[process.env.NODE_ENV || 'development']['distPath'] + url

  filename = path.resolve(filename)
  
  if((/^.+\.css$/).test(filename)) {
    getCssFile(filename, res)
  } else if ((/^.+\.js$/).test(filename)) {
    getJsFile(filename, res)
  } else if ((/^.+\.html$/).test(filename)) {
    getHtmlFile(filename, res)
  } else if ((/^.+\.(png|jpg|jpeg|gif|svg)$/).test(filename)) {
    getImageFile(filename, res)
  } else if ((/^.+\.(eot|woff|ttf)$/).test(filename)) {
    getFontFile(filename, res)
  } else {
    getHtmlFile(filename, res)
  }
}

module.exports = {
  routerModules
}
