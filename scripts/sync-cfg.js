const fs = require('fs')
const path = require('path')
const ipAddress = require('ip').address()
const { getFilesObject } = require('./sync-cfg-dependencies')
const pkg = require('../package.json')
const { checkDirIsOk } = require('./sync-copy-files')
const version = process.env.AppVersion || pkg.version
const envKey = process.env.NODE_ENV  || process.argv[2] || 'production'

function mathcedCfgFile() {
  const envCfg = require(`../config/env-${envKey}`)
  return envCfg
}

function getDependencies() {
  return getFilesObject()
}

function getText() {
  const envCfg = mathcedCfgFile()
  const { outputCfg, moduleName } = envCfg
  outputCfg.version = version
  outputCfg.moduleName = moduleName
  outputCfg.dependencies = getDependencies()
  outputCfg.isSingle = true
  outputCfg.isLoaded = false
  const text = `window['${moduleName || defaultName}'] = ` + JSON.stringify(outputCfg, null, '  ').replace(/\{\{ipAddress\}\}/g, ipAddress)

  return { text, envCfg }
}

function syncCfgFile() {
  const { text, envCfg } = getText()
  const tmpPath = `${envCfg.distPath}/js`
  const cfgPath = path.resolve(tmpPath + '/cfg.js')
  checkDirIsOk(tmpPath)
  fs.writeFileSync(cfgPath, text, 'utf8')
}

module.exports = {
  getText
}

syncCfgFile()
