const path = require('path')
const fs = require('fs')
const filePath = path.resolve('./dependencies.json')

function getFiles() {
  let css = []
  let javascript = []

  let dep = fs.readFileSync(filePath)
  let depObj = JSON.parse(dep)['dependencies']
  let rawCss = depObj.css
  let rawJavascript = depObj.javascript
  Object.keys(rawCss).forEach(item => {
    if (rawCss[item] && rawCss[item]['dest']) {
      let dest = rawCss[item]['dest']
      dest = dest.replace('<%version%>', rawCss[item]['version'])
      dest = dest.replace('src/', '')
      css.push(dest)
    }
  })
  Object.keys(rawJavascript).forEach(item => {
    if (rawJavascript[item] && rawJavascript[item]['dest']) {
      let dest = rawJavascript[item]['dest']
      dest = dest.replace('<%version%>', rawJavascript[item]['version'])
      dest = dest.replace('src/', '')
      javascript.push(dest)
    }
  })

  return { css, javascript }
}

function getFilesObject() {
  let css = []
  let javascript = []

  let dep = fs.readFileSync(filePath)
  let depObj = JSON.parse(dep)['dependencies']
  let rawCss = depObj.css
  let rawJavascript = depObj.javascript
  Object.keys(rawCss).forEach(item => {
    if (rawCss[item] && rawCss[item]['dest']) {
      let dest = rawCss[item]['dest']
      dest = dest.replace('<%version%>', rawCss[item]['version'])
      dest = dest.replace('src/', '')
      css.push(dest)
    }
  })
  Object.keys(rawJavascript).forEach(item => {
    if (rawJavascript[item] && rawJavascript[item]['dest']) {
      let dest = rawJavascript[item]['dest']
      dest = dest.replace('<%version%>', rawJavascript[item]['version'])
      dest = dest.replace('src/', '')
      javascript.push({
        [rawJavascript[item]['globaleVar']]: dest
      })
    }
  })

  return { css, javascript }
}

module.exports = {
  getFiles,
  getFilesObject
}
