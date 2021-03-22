const rm = require('rimraf')
const webpackConfig = require('../config/webpack.config')
const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
// const distOperations = require('./release-dist-operations')
// const fs = require('fs')
const envKeyWord = (process.argv)[3] || (process.argv)[2]

function build () {
  var spinner = ora(`Environment ${envKeyWord} is building...`)

  spinner.start()

  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) {
      throw err
    }

    if(stats.compilation.errors.length > 0) {
      console.log(chalk.red(stats.compilation.errors))
      process.exit(1)
    } else {
      console.log(chalk.cyan(`***Environment ${envKeyWord} build succes.****`))
    }
  })
}

build()
