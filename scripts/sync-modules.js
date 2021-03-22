const fs = require('fs')
// const path = require('path')
const { copyFolder, checkDirIsOk } = require('./sync-copy-files')
const modules = require('../config/modules')
const envs = require('../config/env')
const chalk = require('chalk')

function coverCfg(currentModule, cfgPath) {
  const coverCfg = currentModule.cfg
  if (coverCfg) {
    const file = fs.readFileSync(cfgPath, 'utf8')
    const reg = new RegExp(`window\\['${currentModule.moduleName}'\\]\\s?\\=\\s?`)
    const cfgStr = file.replace(reg, '')
    const fn = new Function(`return ${cfgStr}`)
    const cfgJson = fn()
    const newCfg = Object.assign(cfgJson, coverCfg)
    const str = `window['${currentModule.moduleName}'] = ` + JSON.stringify(newCfg, null, '  ')
    fs.writeFileSync(cfgPath, str, 'utf8')
  }
}

function reBuildIndexHtml(currentModule, htmlPath) {
  let file = fs.readFileSync(htmlPath, 'utf8')
  if (currentModule.files.needUseCommonItem) {
    // file = file.replace(/<link[^<]+data-set="use-common"[^<]+\/?>/g, '')
    // file = file.replace(/<script[^<]+data-set="use-common"><\/script>/g, '')
    // file = file.replace(/>[\r\n]\s+</g, '><')
    file = file.replace(/(assets\/[^\s\<\>"]+).+?data-set\="use-common"/g, function($1, $2) {
      const reg = new RegExp($2, 'g')
      return $1.replace(reg, '../../../' + $2);
    })
    fs.writeFileSync(htmlPath, file, 'utf8')
  }
}

function syncFile(currentModule) {
  const realModuleName = currentModule.moduleName

  try {
    const src = `./node_modules/${realModuleName}/dist`
    const envCfg = envs[process.env.NODE_ENV || 'development']
    const dest = `${envCfg['distPath']}/modules/${realModuleName}/${currentModule.version}`

    if (!fs.existsSync(dest)) {
      checkDirIsOk(dest)
      copyFolder(src, dest)
      coverCfg(currentModule, dest + '/js/cfg.js')
      reBuildIndexHtml(currentModule, dest + '/index.html')
    }

    console.log(chalk.cyan(`***sync module ${realModuleName} succes.****`))
  } catch(err) {
    console.error(chalk.red(`sync module ${realModuleName} failed\n`), err)
  }
}

function syncModules() {
  modules.forEach(currentModule => {
    if (currentModule.isInlineModule !== true) {
      syncFile(currentModule)
    }
  })
}

syncModules()
